import { Box, ScrollView } from "native-base";
import { ReactNode } from "react";
import DataEmpty from "./dataEmpty";
import Loading from "./loading";

type Props<T> = {
  loading: boolean;
  data: T[];
  item: (data: T) => ReactNode;
};

export default function ListContainer<T>({ loading, data, item }: Props<T>) {
  if (loading) return <Loading />;
  if (data.length === 0) return <DataEmpty />;

  return (
    <ScrollView>
      {data.map((_) => item(_))}
      <Box mb={32} />
    </ScrollView>
  );
}
