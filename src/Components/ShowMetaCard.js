'use client';
import React from 'react';
import Image from 'next/image'
import fetch from 'node-fetch';
import cheerio from 'cheerio';


export async function getServerSideProps(context) {
    const { url } = context.query;
  
    if (!url) {
      return {
        props: { error: 'URL is missing' },
      };
    }
  
    try {
      // Fetch HTML content of the URL
      const response = await fetch(url);
      const html = await response.text();
  
      // Load HTML using cheerio
      const $ = cheerio.load(html);
  
      // Extract meta tags
      const title = $('title').text();
      const description = $('meta[name="description"]').attr('content') || '';
      const keywords = $('meta[name="keywords"]').attr('content') || '';
  
      return {
        props: {
          title,
          description,
          keywords,
          url,
        },
      };
    } catch (error) {
      return {
        props: { error: error.message },
      };
    }
  }


const CommentsSlider = ({ link}) => {

    return (
        <section className='mt-5 pb-32'>

        </section>
    );
};

export default CommentsSlider;
