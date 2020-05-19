function upworkGetUserInfo() {
  var upworkService = getUpworkService();
  var response = upworkService.fetch(UPWORK_BASE_URL + '/api/auth/v1/info.json');
  return response
}

/**
 * Search for jobs.  See https://developers.upwork.com/?lang=node#jobs_search-for-jobs
 * @param {Object} searchParams 
 */
function upworkJobSearch(searchParams) {
  searchParams = searchParams || {
    'q': 'peloton'
  }
  console.log("Searching for jobs about '" + searchParams.q + "'")
  var params = [];
  for (var prop in searchParams) {
    params.push(prop + '=' + searchParams[prop])
  }
  var upworkService = getUpworkService();
  var url = UPWORK_BASE_URL + '/api/profiles/v2/search/jobs.json?' + params.join('&')
  
  var response = upworkService.fetch(url);

  var jobs = JSON.parse(response).jobs
  console.log("Found " + jobs.length + " jobs for search term '" + searchParams.q + "'")
  return jobs
}