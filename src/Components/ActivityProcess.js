'use client';

import React from 'react';

const CommentsSlider = ({ data, slug }) => {
    // Function to extract the relevant data based on the slug
    const getDisplayData = (slugKey) => {
        if(data && slugKey && data !== "inProcess"){
            if (slugKey in data) {
                return data[slugKey];
            }
            return null;
        }
    };

    // Get the content based on the slug
    const content = slug ? getDisplayData(slug) : false;

    // Function to format object data into title and description
    const formatContent = (content) => {
        if (typeof content === 'object' && content !== null) {
            return (
                <div>
                    {Object.entries(content).map(([key, value]) => (
                        <div key={key} className="mb-4">
                            <h3 className="font-semibold">{key}</h3>
                            <p className="text-gray-700">{value}</p>
                        </div>
                    ))}
                </div>
            );
        }
        return <p className="text-gray-700">{content}</p>;
    };

    return (
        <section>
            {content ? (
                <div className="p-4 border rounded-lg">
                    {formatContent(content)}
                </div>
            ) : (
                <div className="p-4 border rounded-lg">
                    <p className="text-gray-700">No data available for the selected {slug}.</p>
                </div>
            )}
        </section>
    );
};

export default CommentsSlider;
