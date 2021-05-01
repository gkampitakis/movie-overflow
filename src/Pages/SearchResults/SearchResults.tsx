import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { searchRequest } from '../../Api';
import { Actor, Movie, Series } from '../../types';
import ItemList from '../../Components/ItemList';
import './searchResults.scss';

type SearchResultsProps = RouteComponentProps<
  {
    query: string;
  },
  any,
  {
    filters: { actors: boolean; movies: boolean; series: boolean };
  }
>;

type Result = Actor | Movie | Series;

export default function SearchResults(props: SearchResultsProps) {
  const [results, setResults] = useState<Result[] | undefined>();
  const { query } = props.match.params;

  useEffect(() => {
    // searchRequest<{ results: Result[] }>(query, 1)
    //   .then((data) => setResults(data.results))
    //   .catch(console.error);
    setResults(mock.results);
  }, [query]);

  return (
    <section className="main_content search_results">
      {results?.map((res) => (
        <ItemList item={res} key={res.id} />
      ))}
      {!results?.length && <span>Not results found for {query}</span>}
      {!results && <div>Loading...</div>}
    </section>
  );
}

const mock = {
  page: 1,
  results: [
    {
      adult: false,
      backdrop_path: '/xySCWwZVuU03xOsJfs1Qk8yG2DF.jpg',
      genre_ids: [18, 10749],
      id: 226979,
      media_type: 'movie',
      original_language: 'en',
      original_title: 'Test',
      overview:
        'San Francisco, 1985. Two opposites attract at a modern dance company. Together, their courage and resilience are tested as they navigate a world full of risks and promise, against the backdrop of a disease no one seems to know anything about.',
      popularity: 10.861,
      poster_path: '/tTWRomgIMOoIB3CJLPlVbqSawEm.jpg',
      release_date: '2013-06-29',
      title: 'Test',
      video: false,
      vote_average: 6.6,
      vote_count: 105
    },
    {
      backdrop_path: '/ecxpOnYv7iTUVNUmZRoxRksaC1f.jpg',
      first_air_date: '2005-09-17',
      genre_ids: [16, 35],
      id: 1769,
      media_type: 'tv',
      name: 'Johnny Test',
      origin_country: ['CA', 'US'],
      original_language: 'en',
      original_name: 'Johnny Test',
      overview:
        "Young Johnny is gung-ho and full of courage. Johnny's brainiac twin sisters, Susan and Mary, use Johnny as their guinea pig for their outrageous scientific experiments. If they can dream it up, Johnny will do it; as long as his genetically engineered super dog, Dukey, can come along.",
      popularity: 15.134,
      poster_path: '/rn5YbXP4UunS0BLhmjqndHJYhp.jpg',
      vote_average: 5.5,
      vote_count: 79
    },
    {
      adult: false,
      backdrop_path: '/rG2jdLdj4U55MgI3g9f85w2th1y.jpg',
      genre_ids: [28, 878, 53],
      id: 401123,
      media_type: 'movie',
      original_language: 'en',
      original_title: 'Beta Test',
      overview:
        "While testing the latest first person shooter from global game developer, Sentinel, video game champion Max Troy discovers the events happening within the game are being reflected in the real world. He soon determines that the game's protagonist is real-life Orson Creed, an ex-Sentinel employee who is being remotely controlled by the corporation for reasons unknown. As virtual and real worlds collide, Max and Creed must join forces to unravel the conspiracy before the game's sinister events escalate and overwhelm the city.",
      popularity: 8.214,
      poster_path: '/zKisJfMxpp0KfX4P3VyDrH0edg6.jpg',
      release_date: '2016-07-22',
      title: 'Beta Test',
      video: false,
      vote_average: 5.3,
      vote_count: 137
    },
    {
      adult: false,
      backdrop_path: '/x5t4isLoBmetWszgZRD1LI1VgQX.jpg',
      genre_ids: [18],
      id: 637254,
      media_type: 'movie',
      original_language: 'en',
      original_title: 'Test Pattern',
      overview:
        'A relationship is put to the test after the girlfriend is sexually assaulted and the boyfriend drives her from hospital to hospital in search of a rape kit.',
      popularity: 9.093,
      poster_path: '/26TUusJoyE5G1KVpu2IijUi9hbi.jpg',
      release_date: '2021-02-19',
      title: 'Test Pattern',
      video: false,
      vote_average: 7,
      vote_count: 3
    },
    {
      adult: false,
      backdrop_path: null,
      genre_ids: [18],
      id: 617120,
      media_type: 'movie',
      original_language: 'en',
      original_title: 'Test',
      overview:
        'Kurt Longson tries to avenge his daughters death. To succeed he has to battle with his conscience and morality to realize true love.',
      popularity: 6.439,
      poster_path: '/5F6eKWJNHfYgHf2PDsb73fmAdK8.jpg',
      release_date: '2018-05-22',
      title: 'Test',
      video: false,
      vote_average: 4.7,
      vote_count: 23
    },
    {
      adult: false,
      backdrop_path: '/qyM5OA9UfIlNWocQrI3BH7CZhxo.jpg',
      genre_ids: [18, 10749],
      id: 43155,
      media_type: 'movie',
      original_language: 'en',
      original_title: 'Test Pilot',
      overview:
        'Jim is a test pilot. His wife Ann and best friend Gunner try their best to keep him sober. But the life of a test pilot is anything but safe.',
      popularity: 5.994,
      poster_path: '/j3Xn5Zl9IGOHyEqNYU31eyiLTQE.jpg',
      release_date: '1938-04-16',
      title: 'Test Pilot',
      video: false,
      vote_average: 6.4,
      vote_count: 42
    },
    {
      adult: false,
      backdrop_path: '/e8RKGOcU1QpNoDpBzwCxfTDSQep.jpg',
      genre_ids: [35, 10751],
      id: 160647,
      media_type: 'movie',
      original_language: 'en',
      original_title: '3 Day Test',
      overview:
        "Martin Taylor has totally lost touch with his family. He has no clue who his teenage daughter's friends are, why his son only communicates with an electronic sign outside his bedroom door, or why his youngest child only watches faith TV. Convinced the family needs to reconnect, Martin surprises the wife and kids with a little experiment-he locks them in their own home with no power, no heat, no running water, and absolutely no contact with the world outside! The sudden holiday staycation isn't what the Taylors had in mind for the weekend, but they'll have to team up to prove they can survive Dad's wacky mission. With a heartfelt message and some persistence, one little member of the family helps put their priorities back in the pews, because they'll need all the faith they have to get through this!",
      popularity: 6.592,
      poster_path: '/tU92SyvB0YKjgkZx3qW6iu89BQq.jpg',
      release_date: '2012-11-05',
      title: '3 Day Test',
      video: false,
      vote_average: 5.3,
      vote_count: 17
    },
    {
      adult: false,
      backdrop_path: '/6Hw9TxmY0PV93VB2CCQFFqqRFI4.jpg',
      genre_ids: [878],
      id: 679548,
      media_type: 'movie',
      original_language: 'en',
      original_title: 'The Alpha Test',
      overview:
        'A suburban family drives their new gadget, The Alpha Home Assistant, to a killing rampage after mistreating and abusing it, leading to a full A.I. uprising…',
      popularity: 5.199,
      poster_path: '/ozbvCucRf3ZXUH5oQSdAayjLVdg.jpg',
      release_date: '2021-02-04',
      title: 'The Alpha Test',
      video: false,
      vote_average: 7,
      vote_count: 2
    },
    {
      backdrop_path: '/2UwBG0nStY7JhLQnP5LKVSGPNx4.jpg',
      first_air_date: '2001-08-04',
      genre_ids: [],
      id: 4591,
      media_type: 'tv',
      name: "America's Test Kitchen",
      origin_country: ['US'],
      original_language: 'en',
      original_name: "America's Test Kitchen",
      overview:
        "America's Test Kitchen is a half-hour cooking show distributed to public television stations in the United States, also airing in Canada. The show's host is Cook's Illustrated editor-in-chief Christopher Kimball; the show and the magazine are affiliated, and the magazine's test kitchen facility in Brookline, Massachusetts, is used as a set for the show.\n\nCook's Illustrated's parent company, Boston Common Press, renamed itself America's Test Kitchen in 2004.",
      popularity: 5.38,
      poster_path: '/eZjnMVcVgdSwJJB6aLfcqefxq0z.jpg',
      vote_average: 8,
      vote_count: 6
    },
    {
      adult: false,
      backdrop_path: '/qCfcrZdYCMB7GOr7971T6jLR5kl.jpg',
      genre_ids: [35],
      id: 456768,
      media_type: 'movie',
      original_language: 'fr',
      original_title: 'Crash Test Aglaé',
      overview:
        "Aglaé, a young factory worker, has only one focus in life: her job at a car crash test site. When she learns that the factory is going to be relocated abroad, she accepts, to everyone's surprise, to go to India in order to hold on to her job. Accompanied by two colleagues, she sets out on a perilous road trip to the other side of the world.",
      popularity: 4.422,
      poster_path: '/8dTtG54rJbg3HWxFptUageWcfBD.jpg',
      release_date: '2017-08-02',
      title: 'Crash Test Aglaé',
      video: false,
      vote_average: 6.1,
      vote_count: 60
    },
    {
      adult: false,
      backdrop_path: null,
      genre_ids: [35],
      id: 355161,
      media_type: 'movie',
      original_language: 'en',
      original_title: 'Crash Test',
      overview:
        'Adapted from their beloved comedy show at Upright Citizens Brigade, Crash Test showcases Rob Huebel and Paul Scheer on a state-of-the-art party bus adventure, picking up famous comedians and celebrities as they go on a sightseeing tour of Los Angeles. Ben Stiller, Stuart Cornfeld and Mike Rosenstein of Red Hour executive produced the special.',
      popularity: 3.655,
      poster_path: '/aYyVunZFovilRWCiQMhgWu99ZIa.jpg',
      release_date: '2015-08-18',
      title: 'Crash Test',
      video: false,
      vote_average: 5.8,
      vote_count: 8
    },
    {
      adult: false,
      backdrop_path: null,
      genre_ids: [35, 80, 53],
      id: 604029,
      media_type: 'movie',
      original_language: 'en',
      original_title: "We'll Test It on Humans",
      overview:
        'In a last ditch effort to save his marriage, Ernie Mills decides to test a love drug on two unsuspecting real estate agents before ultimately giving it to his unsuspecting wife. Madness, murder and hijinks ensue.',
      popularity: 6.344,
      poster_path: '/4PnUFwV5FC8lwU0mrHiCzwjstgZ.jpg',
      release_date: '2019-05-09',
      title: "We'll Test It on Humans",
      video: false,
      vote_average: 8.3,
      vote_count: 3
    },
    {
      backdrop_path: '/gNzlviwUtStMOxNiLYmU0GDswV5.jpg',
      first_air_date: '2017-03-10',
      genre_ids: [35],
      id: 71761,
      media_type: 'tv',
      name: 'Bäst i test',
      origin_country: ['SE'],
      original_language: 'sv',
      original_name: 'Bäst i test',
      overview: 'Swedish version of Taskmaster.',
      popularity: 4.533,
      poster_path: '/nnT18R49fIKFmmfaQqMXcBEaplK.jpg',
      vote_average: 5.8,
      vote_count: 4
    },
    {
      adult: false,
      backdrop_path: null,
      genre_ids: [35],
      id: 102841,
      media_type: 'movie',
      original_language: 'en',
      original_title: 'Rabbit Test',
      overview:
        "Lionel's life turns around after a one-night stand on top of a pinball table... he becomes the world's first pregnant man!",
      popularity: 3.049,
      poster_path: '/u5E2cX6MZFIa4YmbsVeRzWyzTQT.jpg',
      release_date: '1978-04-09',
      title: 'Rabbit Test',
      video: false,
      vote_average: 3.4,
      vote_count: 9
    },
    {
      adult: false,
      gender: 0,
      id: 2185136,
      known_for: [
        {
          first_air_date: '2011-01-01',
          genre_ids: [],
          id: 84501,
          media_type: 'tv',
          name: 'Example Show',
          origin_country: ['US'],
          original_language: 'en',
          original_name: 'Example Show',
          overview:
            'An example of a show. An example of a show. An example of a show. An example of a show. An example of a show.',
          vote_average: 0,
          vote_count: 0
        }
      ],
      known_for_department: 'Directing',
      media_type: 'person',
      name: 'Test',
      popularity: 0.6,
      profile_path: null
    },
    {
      adult: false,
      gender: 0,
      id: 3045351,
      known_for: [],
      known_for_department: 'Acting',
      media_type: 'person',
      name: 'test',
      popularity: 0.6,
      profile_path: null
    },
    {
      adult: false,
      backdrop_path: null,
      genre_ids: [35, 18],
      id: 32906,
      media_type: 'movie',
      original_language: 'en',
      original_title: 'This Is Not a Test',
      overview:
        "This Is Not A Test is a comedy/drama directed by Christopher Angel. The film is based around a man called Carl (Hill Harper) who's living his everyday life whilst trying to cope with his fear of terrorist nuclear attacks. However, with the threat so high he soon lets loose and jeopardizes his family and friends.",
      popularity: 4.898,
      poster_path: null,
      release_date: '2009-01-20',
      title: 'This Is Not a Test',
      video: false,
      vote_average: 5.8,
      vote_count: 3
    },
    {
      adult: false,
      backdrop_path: null,
      genre_ids: [99],
      id: 108718,
      media_type: 'movie',
      original_language: 'en',
      original_title: 'Blind - This Is Not a Test',
      overview:
        'This Is Not a Test is the new AM video from Blind Skateboards with a guest PRO part by Danny Cerezini. Focusing on the young gunz of the Blind team, this video pushes skateboarding to the next level around the world. Featuring full-length parts from Morgan Smith, Filipe Ortiz, Kevin Romar, Sewa Kroetkov, Kieran Reilly and TJ Rogers... this video is 100% RAW Skateboarding.',
      popularity: 4.489,
      poster_path: null,
      release_date: '2011-05-23',
      title: 'Blind - This Is Not a Test',
      video: false,
      vote_average: 5.8,
      vote_count: 3
    },
    {
      adult: false,
      backdrop_path: null,
      genre_ids: [16],
      id: 759190,
      media_type: 'movie',
      original_language: 'en',
      original_title: 'Test Flight',
      overview:
        'A bunny witch attempts to get her vegetable-themed broomstick to fly.',
      popularity: 2.61,
      poster_path: null,
      release_date: '2021-04-20',
      title: 'Test Flight',
      video: false,
      vote_average: 0,
      vote_count: 0
    },
    {
      adult: false,
      backdrop_path: '/fqUezRoP1UaPfceUE82KencDf1E.jpg',
      genre_ids: [],
      id: 450685,
      media_type: 'movie',
      original_language: 'en',
      original_title: 'The Old Grey Whistle Test - Volume 2',
      overview:
        '1. Heads Hands &amp; Feet, 2. Kevin Ayers, 3. Roxy Music, 4. Loggins &amp; Messina, 5. The Who, 6. Judee Sill, 7. Argent, 8. Humble Pie, 9. Average White Band, 10. Montrose, 11. Bruce Johnston, 12. Be Bop Deluxe, 13. Nils Lofgren, 14. Daryl Hall &amp; John Oates, 15. Joan Armatrading, 16. Roy Harper, 17. The Adverts, 18. Patti Smith, 19. Siouxsie &amp; the Banshees, 20. Moore &amp; Lynott, 21. Undertones, 22. Squeeze, 23. OMD, 24. Stanley Clarke/George Duke, 25. Tom Verlaine, 26. Aztec Camera, 27. Thomas Dolby, 28. Style Council, 29. Suzanne Vega, 30.Skiffle Jam, 31. Prefab Sprout, 32. Pet Shop Boys, 33. Pogues',
      popularity: 6.089,
      poster_path: '/4qxLllWS95QLXWjN8ElIkgjwTQa.jpg',
      release_date: '2003-10-13',
      title: 'The Old Grey Whistle Test - Volume 2',
      video: true,
      vote_average: 0,
      vote_count: 0
    }
  ],
  total_pages: 65,
  total_results: 1289
} as any;
