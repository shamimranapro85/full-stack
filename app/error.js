'use client';

export default function Error({ error, reset }) {
  // You can log the error here or send it to a monitoring service

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}