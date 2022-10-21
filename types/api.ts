export interface APIProviderScheduledFeeChange {
  fee: number;
  validFromEpoch: number;
}

export interface APIProvider {
  address: string;
  whitelistedSymbols: string[];
  lockedVotePower: number;
  currentVotePower: number;
  totalRewards: number;
  providerRewards: number;
  rewardRate: number;
  averageRewardRate: number;
  accuracy: number;
  availability: number;
  fee: number;
  scheduledFeeChanges: APIProviderScheduledFeeChange[];
}
