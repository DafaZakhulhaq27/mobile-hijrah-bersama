import { Box, ScrollView } from "native-base";
import { ReactNode } from "react";
import { RefreshControl } from "react-native";
import DataEmpty from "./dataEmpty";
import Loading from "./loading";

type Props<T> = {
  loading: boolean;
  data: T[];
  item: (data: T) => ReactNode;
  onRefresh?: () => void;
};

export default function ListContainer<T>({
  loading,
  data,
  item,
  onRefresh,
}: Props<T>) {
  if (loading) return <Loading />;
  if (data.length === 0) return <DataEmpty />;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }
    >
      {data.map((_) => item(_))}
      <Box mb={32} />
    </ScrollView>
  );
}
