import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { useTranslations } from '../hooks/useTranslations';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCpu } from 'react-icons/fi';

interface Recipe {
    recipeName: string;
    description: string;
    ingredients: string[];
    instructions: string[];
}

const RecipeGenerator: React.FC = () => {
  const { t } = useTranslations();
  const [userInput, setUserInput] = useState('');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateRecipe = async () => {
    if (!userInput.trim()) return;
    setIsLoading(true);
    setError('');
    setRecipe(null);

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        
        const schema = {
            type: Type.OBJECT,
            properties: {
              recipeName: {
                type: Type.STRING,
                description: 'A creative name for the recipe.'
              },
              description: {
                type: Type.STRING,
                description: 'A short, enticing one-paragraph description of the dish.'
              },
              ingredients: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'A list of all ingredients required, with quantities.'
              },
              instructions: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Step-by-step instructions for preparing the dish.'
              },
            },
            required: ['recipeName', 'description', 'ingredients', 'instructions']
          };

        const prompt = `Create a delicious recipe for a home cook that includes the following ingredients: "${userInput}". The recipe MUST also prominently feature "Golden Taan palm sugar" as a key ingredient. The tone should be inspiring and easy to follow.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
              responseMimeType: "application/json",
              responseSchema: schema,
            },
        });
        
        const recipeJson = JSON.parse(response.text);
        setRecipe(recipeJson);

    } catch (err) {
        console.error("Gemini API error:", err);
        setError(t('recipes.recipeGenerator.error'));
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="bg-amber-50/50 p-6 md:p-8 rounded-xl shadow-inner border border-amber-200/50 my-12">
      <div className="text-center">
        <FiCpu className="mx-auto text-4xl text-amber-800 mb-2"/>
        <h3 className="text-3xl font-bold text-amber-900">{t('recipes.recipeGenerator.title')}</h3>
        <p className="mt-2 text-stone-600 max-w-2xl mx-auto">{t('recipes.recipeGenerator.subtitle')}</p>
      </div>

      <div className="mt-6 max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={t('recipes.recipeGenerator.placeholder')}
            disabled={isLoading}
            className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none flex-grow"
            onKeyUp={(e) => e.key === 'Enter' && handleGenerateRecipe()}
          />
          <button
            onClick={handleGenerateRecipe}
            disabled={isLoading || !userInput.trim()}
            className="bg-amber-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-amber-900 transition-colors disabled:bg-stone-400 disabled:cursor-not-allowed"
          >
            {t('recipes.recipeGenerator.button')}
          </button>
        </div>
      </div>
      
      <div className="mt-8 min-h-[100px]">
        <AnimatePresence mode="wait">
          {isLoading && (
             <motion.div
                key="loading"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center justify-center p-8 text-amber-800"
              >
                <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-amber-700"></div>
                <p className="mt-4 font-semibold">{t('recipes.recipeGenerator.loading')}</p>
              </motion.div>
          )}

          {error && (
            <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-4 text-center text-red-700 bg-red-100 rounded-lg max-w-2xl mx-auto"
            >
                <p>{error}</p>
            </motion.div>
          )}

          {recipe && (
             <motion.div
                key="recipe"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 rounded-lg shadow-md border max-w-3xl mx-auto"
              >
                <h4 className="text-2xl font-bold text-amber-900 mb-2 text-center">{recipe.recipeName}</h4>
                <p className="text-stone-600 mb-6 text-center italic">{recipe.description}</p>
                
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                        <h5 className="text-lg font-semibold text-stone-800 mb-2 border-b pb-1 border-amber-200">Ingredients</h5>
                        <ul className="list-disc list-inside text-stone-600 space-y-1 pl-2">
                            {recipe.ingredients.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    </div>
                    <div className="md:col-span-2">
                         <h5 className="text-lg font-semibold text-stone-800 mb-2 border-b pb-1 border-amber-200">Instructions</h5>
                        <ol className="list-decimal list-inside text-stone-600 space-y-2 pl-2">
                            {recipe.instructions.map((item, index) => <li key={index} className="pl-1">{item}</li>)}
                        </ol>
                    </div>
                </div>
              </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RecipeGenerator;
