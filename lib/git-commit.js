const gitRepoInfo = require('git-repo-info')
const RSVP = require('rsvp')

const generate = () => {
  let info = gitRepoInfo()

  if (!info || !info.root || !info.branch) {
    return RSVP.reject('Could not find git repository')
  }

  let sha = info.sha.slice(0, 7)
  let branch = info.branch.replace(/[\W_-]+/gi, "-")

  if (!sha) {
    return RSVP.reject('Could not build revision with commit hash `' + sha + '`')
  }

  return RSVP.resolve({
    revisionKey: sha,
    branch: branch,
    timestamp: new Date().toISOString()
  })
}
module.exports = generate
