import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { message, title } = await request.json();
  console.log(message, title);
  
  const res = await fetch('https://api.pushalert.co/rest/v1/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'api_key=ca614ce8898523c0511f3558f5f8f02b',
    },
    body: new URLSearchParams({
      title,
      message,
      url: 'https://order-food-six.vercel.app',
      icon:'https://thumbs.dreamstime.com/b/hacker-cat-wearing-hoodie-hacking-laptop-created-generative-ai-hacker-cat-wearing-hoodie-hacking-laptop-267698623.jpg'
    }),
  });

  const newTodo = await res.json();

  return new Response(newTodo, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
