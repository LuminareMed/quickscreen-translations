// C. Oakman - 27 Mar 2020
// Continuous integration testing script

const assert = require('assert')
const fs = require('fs')
const path = require('path')

const parseEDN = require('edn-to-js')
const glob = require('glob')

const keywordRegex = /:[a-zA-Z0-9\-./]+/g

// sanity-check: english dictionary must exist
if (!fs.existsSync('dictionaries/en.edn')) {
  console.error('[ERROR] dictionaries/en.edn file must exist')
  process.exit(1)
}

// read all the dictionary files into memory and validate EDN syntax
const allDictionaryFiles = glob.sync('dictionaries/*.edn')
const dictionaryFileContents = {}
for (let i = 0; i < allDictionaryFiles.length; i++) {
  const filename = allDictionaryFiles[i]
  const langKey = path.basename(filename, '.edn')
  const fileContents = readFileSync(filename)

  try {
    parseEDN(fileContents)
  } catch (e) {
    console.error('[ERROR] ' + filename + ' is not valid EDN syntax')
    process.exit(1)
  }

  dictionaryFileContents[langKey] = fileContents
}
console.log('[INFO] all dictionary files are valid EDN syntax')

// make sure the language files all have the same resource-id on every line
const enFileContents = dictionaryFileContents.en
const enLines = enFileContents.split('\n')

for (const langKey in dictionaryFileContents) {
  // skip english
  if (langKey === 'en') continue

  let dieAfterCompare = false
  const langFilename = langKey + '.edn'
  const dictionary = dictionaryFileContents[langKey]
  const dictionaryLines = dictionary.split('\n')

  // warn if english and dictionary do not have the same number of lines
  if (enLines.length !== dictionaryLines.length) {
    console.info('[WARN] en.edn and ' + langFilename + ' files should have the same number of lines')
    dieAfterCompare = true
  }

  for (let lineNumIdx = 0; lineNumIdx < enLines.length; lineNumIdx++) {
    const lineNum = lineNumIdx + 1
    const enLine = enLines[lineNumIdx]
    const dictLine = dictionaryLines[lineNumIdx] || ''
    const enResourceId = getResourceIdFromLine(enLine)
    const dictResourceId = getResourceIdFromLine(dictLine)

    if (enResourceId && enResourceId !== dictResourceId) {
      console.error('[ERROR] resource-id ' + enResourceId + ' should be on line ' + lineNum + ' in file ' + langFilename)
      dieAfterCompare = true
    }
  }

  if (dieAfterCompare) {
    console.error('[ERROR] all dictionary files must have the same resource ids on every line')
    process.exit(1)
  }
}

console.log('[INFO] all resource ids line up with en.edn - great job!')
process.exit(0)

// -----------------------------------------------------------------------------
// Helpers

function readFileSync (filename) {
  return fs.readFileSync(filename, 'utf8')
}

// NOTE: this is not intended to be super accurate
// just need a lightweight way to grab one keyword per line
function getResourceIdFromLine (line) {
  const matches = line.match(keywordRegex)
  if (matches && matches.length >= 1) return matches[0]
  return false
}

assert(!getResourceIdFromLine(''))
assert(getResourceIdFromLine('    :landing-page  ') === ':landing-page')
assert(getResourceIdFromLine('    :landing-page "Las personas enfermas deben quedarse en casa. "   ') === ':landing-page')
assert(getResourceIdFromLine('    :landing-page/anyone-who-is-sick "Las personas enfermas deben quedarse en casa. "   ') === ':landing-page/anyone-who-is-sick')
assert(getResourceIdFromLine('   ;; FIXME :location-panel/please-enter-valid-zip "Please enter a valid ZIP code."   ') === ':location-panel/please-enter-valid-zip')
assert(getResourceIdFromLine('  :fort-bend-county.landing-page/title "Welcome to the ') === ':fort-bend-county.landing-page/title')
