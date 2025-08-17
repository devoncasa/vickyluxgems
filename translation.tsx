import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

const deepSet = (obj, path, value) => {
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) {
        current[keys[i]] = {};
    }
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
};

const TranslationRow = ({ label, englishText, path, onTranslationChange }) => {
  const handleInputChange = (e) => {
    onTranslationChange(path, e.target.value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-gray-200 py-4">
      <div>
        <label className="text-sm font-semibold text-gray-500 block">{label}</label>
        <p className="mt-1 text-gray-800 bg-gray-50 p-2 rounded">{englishText}</p>
      </div>
      <div>
        <label className="text-sm font-semibold text-indigo-600 block">Thai Translation</label>
        <textarea
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          rows={String(englishText).length > 80 ? 3 : 1}
          placeholder="Enter Thai translation..."
        ></textarea>
      </div>
    </div>
  );
};

const renderContent = (obj, onTranslationChange, parentKey = '') => {
  return Object.entries(obj).map(([key, value]) => {
    const currentPath = parentKey ? `${parentKey}.${key}` : key;
    if (typeof value === 'string') {
      return (
        <TranslationRow
          key={currentPath}
          label={currentPath}
          englishText={value}
          path={currentPath}
          onTranslationChange={onTranslationChange}
        />
      );
    }
    if (typeof value === 'object' && value !== null) {
      return (
        <div key={currentPath} className="my-6 p-4 border border-gray-300 rounded-lg bg-white shadow-sm">
          <h2 className="text-xl font-bold capitalize text-indigo-700 mb-4 border-b pb-2">{key.replace(/([A-Z])/g, ' $1')}</h2>
          {renderContent(value, onTranslationChange, currentPath)}
        </div>
      );
    }
    return null;
  });
};

const TranslationTool = () => {
  const [translations, setTranslations] = useState({});
  const [generatedJson, setGeneratedJson] = useState('');
  const [textContent, setTextContent] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/locales/en.json')
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to fetch translation file');
            }
            return res.json();
        })
        .then(data => setTextContent(data))
        .catch(err => {
            console.error("Failed to load text content", err);
            setError('Could not load source translation file. Please make sure /locales/en.json exists.');
        });
  }, []);


  const handleTranslationChange = useCallback((path, value) => {
    setTranslations(prev => {
        const newTranslations = JSON.parse(JSON.stringify(prev)); // Deep copy
        deepSet(newTranslations, path, value);
        return newTranslations;
    });
  }, []);

  const generateJson = () => {
    setGeneratedJson(JSON.stringify(translations, null, 2));
  };
  
  const copyToClipboard = () => {
    if (!generatedJson) return;
    navigator.clipboard.writeText(generatedJson).then(() => {
      alert('JSON copied to clipboard!');
    }, (err) => {
      alert('Failed to copy JSON.');
      console.error('Could not copy text: ', err);
    });
  };

  if (error) {
    return (
        <div className="container mx-auto p-8 text-center">
            <h1 className="text-2xl font-bold text-red-600">Error</h1>
            <p className="mt-4 text-red-500">{error}</p>
        </div>
    );
  }

  if (!textContent) {
      return (
          <div className="container mx-auto p-8 text-center">
              <h1 className="text-2xl font-bold text-gray-700">Loading Content...</h1>
          </div>
      );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="text-center my-8">
        <h1 className="text-4xl font-extrabold text-gray-800">Golden Taan Translation Tool</h1>
        <p className="mt-2 text-lg text-gray-600">Enter the Thai translations for each piece of English text below.</p>
      </header>

      <main>
        {renderContent(textContent, handleTranslationChange)}
      </main>

      <footer className="my-12">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <button
            onClick={generateJson}
            className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition-colors text-lg"
            >
            Generate Translation JSON
            </button>
        </div>

        {generatedJson && (
          <div className="mt-8 bg-gray-800 text-white p-6 rounded-lg shadow-inner">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">Generated JSON</h3>
                <button 
                    onClick={copyToClipboard}
                    className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition-colors"
                >
                    Copy to Clipboard
                </button>
            </div>
            <pre className="overflow-x-auto whitespace-pre-wrap bg-gray-900 p-4 rounded-md">
              <code>{generatedJson}</code>
            </pre>
          </div>
        )}
      </footer>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <TranslationTool />
  </React.StrictMode>
);