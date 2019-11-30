import {
  getSummonerByName,
  getMatchList,
  getMatch,
  getLeagueEntriesBySummoner,
  Tier,
  Team
} from './riot-api';

const main = async (): Promise<void> => {
  const inputSummonerName = 'Haidyn';

  const summoner = await getSummonerByName(inputSummonerName);
  const { matches } = await getMatchList(summoner.accountId, 10);
  const lastMatchReference = matches[0];
  const matchId = lastMatchReference.gameId;
  const lastMatch = await getMatch(matchId);

  const participantsPromises = lastMatch.participantIdentities.map(
    async ({ player: { summonerId, summonerName }, participantId }) => ({
      participantId,
      summonerName,
      leagueEntries: await getLeagueEntriesBySummoner(summonerId)
    })
  );

  const participants = await Promise.all(participantsPromises);

  const participantsWithTiers = participants.map(
    ({ leagueEntries, ...rest }) => ({
      tier: leagueEntries
        .filter(
          leagueEntry =>
            leagueEntry.queueType === 'RANKED_FLEX_SR' ||
            leagueEntry.queueType === 'RANKED_SOLO_5x5'
        )
        .map(leagueEntry => leagueEntry.tier)
        .reduce(
          (currentBest, tier) => (tier > currentBest ? tier : currentBest),
          Tier.Unranked
        ),
      ...rest
    })
  );

  const zipped = participantsWithTiers.map((participant, i) => {
    return {
      ...participant,
      ...lastMatch.participants[i]
    };
  });

  interface ParticipantRank {
    summonerName: string;
    tier: Tier;
  }

  const blue: ParticipantRank[] = zipped.filter(p => p.team === Team.Blue);
  const red: ParticipantRank[] = zipped.filter(p => p.team === Team.Red);

  const printParticipant = (p: typeof blue[0]): void => {
    const spaces = ' '.repeat(20 - p.summonerName.length);
    console.log(`${p.summonerName}${spaces}${Tier[p.tier]}`);
  };

  console.log('BLUE TEAM');
  blue.forEach(p => printParticipant(p));

  console.log('\nRED TEAM');
  red.forEach(p => printParticipant(p));
};

(async function start(): Promise<void> {
  await main();
})();
