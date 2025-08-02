import React from 'react';
import { Author } from '../types';

interface AuthorBioProps {
    author: Author;
}

const AuthorBio: React.FC<AuthorBioProps> = ({ author }) => {
    return (
        <div className="mt-12 bg-[var(--c-surface)] p-6 rounded-lg shadow-sm border border-[var(--c-border)] flex flex-col sm:flex-row items-center gap-6">
            <img 
                src={author.imageUrl} 
                alt={`Portrait of ${author.name}`} 
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md flex-shrink-0"
                loading="lazy"
            />
            <div>
                <h3 className="text-xl font-bold text-[var(--c-heading)]">About the Author</h3>
                <p className="font-semibold text-lg text-[var(--c-accent-primary)] mt-1">{author.name}</p>
                <p className="text-sm font-medium text-[var(--c-text-secondary)] -mt-1">{author.title}</p>
                <p className="mt-2 text-[var(--c-text-primary)]/80 text-sm">
                    {author.bio}
                </p>
            </div>
        </div>
    );
};

export default AuthorBio;
