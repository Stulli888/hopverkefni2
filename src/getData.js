export default async function getData(url) {
  let result;

  result = await fetch(url);
  if(!result.ok) {
    console.error('Mistókst að sækja gögnin');
  }

  const data = await result.json();

  return data;
}
