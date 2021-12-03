import graphQLFetch from './graphQLFetch.jsx';

export default async function loadData(setData, list) {
  const query = `query ${list} {
          ${list} {
            name
            id
          }
        }`;
  const vars = {};

  const data = await graphQLFetch(query, vars);

  if (data.listTypeTaches) {
    setData(data.listTypeTaches);
  }
  if (data.listStatIvpn) {
    setData(data.listStatIvpn);
  }
  if (data.listStatCom) {
    setData(data.listStatCom);
  }
}
