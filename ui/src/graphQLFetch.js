const dateRegex = '^\\d\\d\\d\\d-\\d\\d-\\d\\d';

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

export default async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);

    if (result.errors) {
      const error = result.errors[0];
      if (error.extension.code === 'BAD_USER_INPUT') {
        const details = error.extension.exception.errors.join('\n');
        alert(`${error.message}:\n${details}`);
      } else {
        alert(`${error.extension.code}:\n ${details}`);
      }
    }
  } catch (e) {
    alert(`Error in sending data to server : ${e.message}`);
    return null;
  }
}
