import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET() {
  try {
    console.log("=== AI Category Suggestions API Called ===");

    if (!process.env.OPENAI_API_KEY) {
      console.error("ERROR: OPENAI_API_KEY is not set");
      return NextResponse.json(
        { error: "OpenAI API key is not configured" },
        { status: 500 }
      );
    }

    console.log("Generating trending categories...");

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant that suggests trending blog categories. 
          Provide exactly 10 popular and trending blog categories that are relevant in ${new Date().getFullYear()}.
          Return ONLY a JSON array of category objects with 'name' and 'description' fields.
          Categories should be diverse, covering technology, lifestyle, business, health, entertainment, etc.
          Keep descriptions concise (under 50 words).`,
        },
        {
          role: "user",
          content: "Suggest 10 trending blog categories for a modern blogging platform.",
        },
      ],
      temperature: 0.8,
      max_tokens: 800,
      response_format: { type: "json_object" },
    });

    const response = completion.choices[0]?.message?.content;
    
    if (!response) {
      throw new Error("No response from OpenAI");
    }

    console.log("Raw OpenAI response:", response);

    
    const data = JSON.parse(response);
    
    
    let categories = [];
    if (data.categories && Array.isArray(data.categories)) {
      categories = data.categories;
    } else if (Array.isArray(data)) {
      categories = data;
    } else {
      
      const keys = Object.keys(data);
      categories = keys.map(key => data[key]);
    }

    console.log("Parsed categories:", categories);

    
    if (categories.length < 10) {
      console.warn("Less than 10 categories received, using fallback");
      
      const fallbackCategories = [
        { name: "Technology", description: "Latest tech trends, gadgets, and innovations" },
        { name: "Travel", description: "Explore destinations, travel tips, and adventures" },
        { name: "Food & Cooking", description: "Recipes, culinary tips, and food culture" },
        { name: "Health & Wellness", description: "Fitness, mental health, and healthy living" },
        { name: "Finance", description: "Personal finance, investing, and money management" },
        { name: "Lifestyle", description: "Fashion, home decor, and daily inspiration" },
        { name: "Business", description: "Entrepreneurship, startups, and business growth" },
        { name: "Entertainment", description: "Movies, TV shows, music, and pop culture" },
        { name: "Education", description: "Learning resources, tutorials, and skill development" },
        { name: "Sports", description: "Sports news, fitness, and athletic performance" },
      ];
      
      categories = [...categories, ...fallbackCategories].slice(0, 10);
    }

    
    const validCategories = categories.slice(0, 10).map((cat: any) => ({
      name: cat.name || cat.title || "Unknown Category",
      description: cat.description || cat.desc || "No description available",
    }));

    return NextResponse.json({ categories: validCategories }, { status: 200 });
  } catch (error: any) {
    console.error("=== OpenAI Category Suggestion Error ===");
    console.error("Error:", error);

    
    return NextResponse.json(
      {
        categories: [
          { name: "Technology", description: "Latest tech trends, gadgets, and innovations" },
          { name: "Travel", description: "Explore destinations, travel tips, and adventures" },
          { name: "Food & Cooking", description: "Recipes, culinary tips, and food culture" },
          { name: "Health & Wellness", description: "Fitness, mental health, and healthy living" },
          { name: "Finance", description: "Personal finance, investing, and money management" },
          { name: "Lifestyle", description: "Fashion, home decor, and daily inspiration" },
          { name: "Business", description: "Entrepreneurship, startups, and business growth" },
          { name: "Entertainment", description: "Movies, TV shows, music, and pop culture" },
          { name: "Education", description: "Learning resources, tutorials, and skill development" },
          { name: "Sports", description: "Sports news, fitness, and athletic performance" },
        ],
      },
      { status: 200 }
    );
  }
}