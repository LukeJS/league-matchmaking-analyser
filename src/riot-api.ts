import fetch from 'node-fetch';

const options = {
  headers: {
    'X-Riot-Token': process.env.RIOT_API_KEY as string
  }
};

const callRiotApi = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(endpoint, options);
  const result = await response.json();
  return result;
};

export enum Team {
  Blue,
  Red
}

const parseTeam = (teamNum: number): Team => {
  switch (teamNum) {
    case 100:
      return Team.Blue;
    case 200:
      return Team.Red;
    default:
      return Team.Blue;
  }
};

export const getMatch = async (matchId: number): Promise<Match> => {
  const endpoint = `https://euw1.api.riotgames.com/lol/match/v4/matches/${matchId}`;
  const { participants, ...rest } = await callRiotApi<MatchResponse>(endpoint);

  return {
    participants: participants.map(({ teamId, ...pRest }) => ({
      team: parseTeam(teamId),
      ...pRest
    })),
    ...rest
  };
};

export const getMatchList = async (
  accountId: string,
  numberOfMatches = 10
): Promise<MatchList> => {
  return callRiotApi<MatchList>(
    `https://euw1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?endIndex=${numberOfMatches}`
  );
};

export enum Tier {
  Unranked,
  Iron,
  Bronze,
  Silver,
  Gold,
  Platinum,
  Diamond,
  Master,
  Grandmaster,
  Challenger
}

export const parseTier = (tierStr: string): Tier => {
  switch (tierStr) {
    case 'UNRANKED':
      return Tier.Unranked;
    case 'IRON':
      return Tier.Iron;
    case 'BRONZE':
      return Tier.Bronze;
    case 'SILVER':
      return Tier.Silver;
    case 'GOLD':
      return Tier.Gold;
    case 'PLATINUM':
      return Tier.Platinum;
    case 'DIAMOND':
      return Tier.Diamond;
    case 'MASTER':
      return Tier.Master;
    case 'GRANDMASTER':
      return Tier.Grandmaster;
    case 'CHALLENGER':
      return Tier.Challenger;
    default:
      return Tier.Bronze;
  }
};

export const getLeagueEntriesBySummoner = async (
  summonerId: string
): Promise<LeagueEntry[]> => {
  const response = await callRiotApi<LeagueEntryResponse[]>(
    `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`
  );

  return response.map(({ tier: tierStr, ...rest }) => ({
    tier: parseTier(tierStr),
    ...rest
  }));
};

export const getSummoner = async (summonerId: string): Promise<Summoner> => {
  return callRiotApi<Summoner>(
    `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/${summonerId}`
  );
};

export const getSummonerByName = async (
  summonerName: string
): Promise<Summoner> => {
  return callRiotApi<Summoner>(
    `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`
  );
};

export interface MatchList {
  matches: MatchReference[];
}

export interface MatchReference {
  gameId: number;
}

interface MatchResponse {
  participants: ParticipantResponse[];
  participantIdentities: ParticipantIdentity[];
}

export interface Match {
  participants: Participant[];
  participantIdentities: ParticipantIdentity[];
}

interface ParticipantResponse {
  participantId: number;
  teamId: number;
  championId: number;
}

export interface Participant {
  participantId: number;
  team: Team;
  championId: number;
}

export interface ParticipantIdentity {
  participantId: number;
  player: Player;
}

export interface Player {
  summonerId: string;
  summonerName: string;
  currentAccountId: string;
}

export interface Summoner {
  id: string;
  accountId: string;
  name: string;
}

interface LeagueEntryResponse {
  summonerName: string;
  queueType: string;
  rank: string;
  leagueId: string;
  tier: string;
  leaguePoints: string;
}

export interface LeagueEntry {
  summonerName: string;
  queueType: string;
  rank: string;
  leagueId: string;
  tier: Tier;
  leaguePoints: string;
}
