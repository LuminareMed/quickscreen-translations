# QuickScreen Translations [![Actions Status](https://github.com/LuminareMed/quickscreen-translations/workflows/resource-files-ci/badge.svg)](https://github.com/LuminareMed/quickscreen-translations/actions)

Translation files for QuickScreen at https://CheckForCorona.com

## What is all this about?

[Luminare] is building a self-assessment screening product for COVID-19 called
QuickScreen. It is available at https://CheckForCorona.com

We are working with hospitals and public health organizations to provide custom
screening instructions as well as integrating with their testing and other
protocols in order to ensure the safety of healthcare workers, patients, and the
public at large.

We have a contract with [Harris County Public Health] and [City of Houston Health
Department] to provide this service free of cost. We have been working closely
with political leaders and epidemiologists to design the screening criteria and
instructions for testing protocols for public use. As of 24 Mar 2020, the service
is live and currently "in use" serving many millions of people! https://www.checkforcorona.com/harris-county

If you know of a hospital or public health organization that could benefit from
QuickScreen please [get in touch](mailto:alex.fernandez@luminaremed.com). We are
currently providing this service **at no cost** for hospitals and public health
organizations.

[Harris County Public Health]:http://publichealth.harriscountytx.gov/
[City of Houston Health Department]:https://www.houstontx.gov/health/

## How can I help?

> Please [see here](https://gist.github.com/oakmac/4ea7e93d595826993a5843f1d40dd397) for instructions for non-technical users to contribute!

Harris County / City of Houston have provided us with officially translated
documents for the 1) screening questions and answers and 2) outcome panels /
result screens at the end of the screening process.

We need help porting these official translations into our resource files (located
in this repo), as well as help translating other parts of the application that
are not covered by these translation documents (things like the footer, About Us
page, etc).

Since these are medical questions, the integrity of the translation is important
and we must use exactly the official translation from the documents (where
applicable).

Things are changing rapidly as we develop the product, so there may be new
requirements as we progress.

## Technology

We are using [tempura] for [i18n] and storing translation dictionaries in simple
[EDN files] (very similar to JSON).

The English dictionary file [`en.edn`](en.edn) will always reflect the latest
version of the product. The QuickScreen development team has a bit of Spanish
translating capability, but otherwise we all work in English.

We welcome all Pull Requests to this repo to help us keep the other languages "in
sync" with English. Please see the Development Notes section below for tips on
working with the language files.

Please note that any contributions to this repo will be licensed under [CC0]. We
greatly appreciate all community contributions!

[tempura]:https://github.com/ptaoussanis/tempura
[i18n]:https://en.wikipedia.org/wiki/Internationalization_and_localization
[EDN files]:https://github.com/edn-format/edn
[CC0]:https://creativecommons.org/publicdomain/zero/1.0/

## Development Notes

Some notes for contributors and developers:

- We want to keep a "one line, one translation" convention
- All of the resource ids should be on the same line in each file
  - ie: if resource id `:foo` is defined on line 37 in `en.edn`, then line 37 in `zh.edn` should also be for `:foo`
- There is a lightweight [test script](test.js) to verify this format (also runs via a GitHub Action on every commit and PR)
- The translations always fall back to the english resource-id, so please no english text in the language files.
- A `FIXME` comment in a language file means a missing translation, and an opportunity for a Pull Request :)
- A line with a `REMOVED` comment means that translation string is no longer referenced and will be removed eventually. They are left in the files temporarily for context, usually similar to translation strings nearby.

## License [![License: CC0-1.0](https://licensebuttons.net/l/zero/1.0/80x15.png)](http://creativecommons.org/publicdomain/zero/1.0/)

This git repository and all translation files are licensed under the [Creative
Commons CC0 1.0 Universal] license:

> You can copy, modify, distribute and perform the work, even for commercial purposes, all without asking permission.

Please note that the QuickScreen product by Luminare is **not** released under
an open source license. CC0 is only for the translation files in this repo.

[Creative Commons CC0 1.0 Universal]:https://creativecommons.org/publicdomain/zero/1.0/
[Luminare]:https://www.luminaremed.com/
