import { Chain, CHAIN } from "../constants";
import { DelegationStat, EthBlock, FTSODataProviderBasic } from "../types";
import { APIDelegationStat, APIEthBlock, APIProvider } from "../types/api";
import { FTSODataProviderTowo } from "../types/external";
import flareMetricsData from "../../assets/flaremetricLinks.json";

export const mapFTSODataProvider = (
  apiProvider: APIProvider,
  towoProvider?: FTSODataProviderTowo
): FTSODataProviderBasic => ({
  address: apiProvider.address,
  name: towoProvider?.name ?? apiProvider.address,
  logoUrl: towoProvider
    ? towoProvider.logoURI
    : "https://cdn.flaremetrics.io/flare/ftso/emblem/unknown@64.png",
  accuracy: apiProvider.accuracy,
  fee: apiProvider.fee,
  scheduledFeeChange: apiProvider.scheduledFeeChanges.map(
    (scheduledFeeChanges) => ({
      fee: Number(scheduledFeeChanges.fee),
      validFromEpoch: Number(scheduledFeeChanges.validFromEpoch),
    })
  ),
  currentVotePower: apiProvider.currentVotePower,
  lockedVotePower: apiProvider.lockedVotePower,
  currentVotePowerPercentage: apiProvider.currentVotePowerPercentage,
  lockedVotePowerPercentage: apiProvider.lockedVotePowerPercentage,
  currentRewardRate: apiProvider.rewardRate,
  averageRewardRate: null,
  currentReward: apiProvider.providerRewards,
  totalReward: apiProvider.totalRewards,
  availability: apiProvider.availability,
  whitelistedSymbols: apiProvider.whitelistedSymbols,
  flareMetricsLink:
    CHAIN === Chain.Songbird
      ? (flareMetricsData as any)[apiProvider.address] ?? null // TODO: link to Flaremetrics by URL when available
      : null,
  ftsoMonitorLink: `https://${CHAIN}-ftso-monitor.flare.network/price?currency=XRP&startTime=30m&providerAddress=${apiProvider.address.toLowerCase()}`,
  blockChainExplorerLink: `https://${CHAIN}-explorer.flare.network/address/${apiProvider.address}`,
});

export const mapEthBlock = (apiEthBlock: APIEthBlock): EthBlock => {
  return {
    blockHash: apiEthBlock.blockHash,
    blockNumber: apiEthBlock.blockNumber,
    timestamp: apiEthBlock.timestamp,
  };
};

export const mapDelegationStat = (
  apiDelegationStat: APIDelegationStat,
  apiTowoDataProvider?: FTSODataProviderTowo
): DelegationStat => {
  return {
    address: String(apiDelegationStat.address),
    name: apiTowoDataProvider?.name ?? apiDelegationStat.address,
    logoUrl: apiTowoDataProvider
      ? apiTowoDataProvider.logoURI
      : "https://cdn.flaremetrics.io/flare/ftso/emblem/unknown@64.png",
    count: Number(apiDelegationStat.count),
    average: Number(apiDelegationStat.average),
    standardDeviation: Number(apiDelegationStat.standardDeviation),
    percentageChange24Hour: Number(apiDelegationStat.percentageChange24Hour),
  };
};
