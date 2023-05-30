interface SummonerSpell {
  displayName: string;
  rawDescription: string;
  rawDisplayName: string;
}

interface Runes {
  keystone: {
    displayName: string;
    id: number;
    rawDescription: string;
    rawDisplayName: string;
  };
  primaryRuneTree: {
    displayName: string;
    id: number;
    rawDescription: string;
    rawDisplayName: string;
  };
  secondaryRuneTree: {
    displayName: string;
    id: number;
    rawDescription: string;
    rawDisplayName: string;
  };
}

interface Scores {
  assists: number;
  creepScore: number;
  deaths: number;
  kills: number;
  wardScore: number;
}

interface Player {
  championName: string;
  isBot: boolean;
  isDead: boolean;
  items: any[]; // replace with actual type
  level: number;
  position: string;
  rawChampionName: string;
  respawnTimer: number;
  runes: Runes;
  scores: Scores;
  skinID: number;
  summonerName: string;
  summonerSpells: {
    summonerSpellOne: SummonerSpell;
    summonerSpellTwo: SummonerSpell;
  };
  team: string;
}
