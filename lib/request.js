import axios from 'axios';

axios.interceptors.response.use(function(response) {
  return response.data;
});

export function fetchGitRepository() {
  return axios.get('https://api.github.com/repos/rippi-cli-template/react/branches');
};
