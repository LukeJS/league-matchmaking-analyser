import { parseTier, Tier } from './riot-api';

describe('parseTier', () => {
  test('should parse "UNRANKED" to Tier.Unranked', () => {
    expect(parseTier('UNRANKED')).toBe(Tier.Unranked);
  });

  test('should parse "IRON" to Tier.Iron', () => {
    expect(parseTier('IRON')).toBe(Tier.Iron);
  });

  test('should parse "BRONZE" to Tier.Bronze', () => {
    expect(parseTier('BRONZE')).toBe(Tier.Bronze);
  });

  test('should parse "SILVER" to Tier.Silver', () => {
    expect(parseTier('SILVER')).toBe(Tier.Silver);
  });

  test('should parse "GOLD" to Tier.Gold', () => {
    expect(parseTier('GOLD')).toBe(Tier.Gold);
  });

  test('should parse "PLATINUM" to Tier.Platinum', () => {
    expect(parseTier('PLATINUM')).toBe(Tier.Platinum);
  });

  test('should parse "DIAMOND" to Tier.Diamond', () => {
    expect(parseTier('DIAMOND')).toBe(Tier.Diamond);
  });

  test('should parse "MASTER" to Tier.Master', () => {
    expect(parseTier('MASTER')).toBe(Tier.Master);
  });

  test('should parse "GRANDMASTER" to Tier.Grandmaster', () => {
    expect(parseTier('GRANDMASTER')).toBe(Tier.Grandmaster);
  });

  test('should parse "CHALLENGER" to Tier.Challenger', () => {
    expect(parseTier('CHALLENGER')).toBe(Tier.Challenger);
  });
});
