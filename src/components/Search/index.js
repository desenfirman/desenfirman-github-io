import './styles.scss'
import React, {
    useState,
    useEffect,
    createRef
} from "react"
import {
    InstantSearch,
    // Index,
    // SearchBox,
    Hits,
    connectStateResults,
} from "react-instantsearch-dom"
import algoliasearch from "algoliasearch/lite"

// import { Root, HitsWrapper, PoweredBy } from "./styles"
import Input from "./input"
import * as hitComps from "./hitComps"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Results = connectStateResults(
    ({ searchState: state, searchResults: res, children }) =>
        res && res.nbHits > 0 ? children : `No results for '${state.query}'`
)

const Stats = connectStateResults(
    ({ searchResults: res }) =>
        res && res.nbHits > 0 && `${res.nbHits} result${res.nbHits > 1 ? `s` : ``}`
)

const useClickOutside = (ref, handler, events) => {
    if (!events) events = [`mousedown`, `touchstart`]
    const detectClickOutside = event =>
        ref.current && !ref.current.contains(event.target) && handler()
    useEffect(() => {
        for (const event of events)
            document.addEventListener(event, detectClickOutside)
        return () => {
            for (const event of events)
                document.removeEventListener(event, detectClickOutside)
        }
    })
}

const Root = <div></div>

export const PoweredBy = () => (
    <span style={{fontSize: '0.75em', textAlign: 'end', margin: '1em 0 0 0'}}>
      Powered by{` `}
      <a href="https://algolia.com">
        <FontAwesomeIcon icon='algolia' /> Algolia
      </a>
    </span>
  )

export default function Search({ indices, collapse, hitsAsGrid }) {
    const ref = createRef()
    const [query, setQuery] = useState(``)
    const [focus, setFocus] = useState(false)
    const searchClient = algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
    )
    useClickOutside(ref, () => setFocus(false))
    // console.log(ref)
    return (
        <InstantSearch
            searchClient={searchClient}
            indexName={indices[0].name}
            onSearchStateChange={({ query }) => setQuery(query)}
            root={{ Root, props: { ref } }}
        >
            <Input onFocus={() => setFocus(true)} {...{ collapse, focus }} />

            {/* <SearchBox onFocus={() => setFocus(true)} {...{ collapse, focus }}/> */}
                {(query.length > 0 && focus) ? <Hits hitComponent={hitComps[indices[0].hitComp](() => setFocus(false))} /> : null}
                <PoweredBy />
            {/* <HitsWrapper show={query.length > 0 && focus} asGrid={hitsAsGrid}>
                {indices.map(({ name, title, hitComp }) => (
                    <Index key={name} indexName={name}>
                        <header>
                            <h3>{title}</h3>
                            <Stats />
                        </header>
                        <Results>
                            <Hits hitComponent={hitComps[hitComp](() => setFocus(false))} />
                        </Results>
                    </Index>
                ))}
            </HitsWrapper> */}
        </InstantSearch>
    )
}