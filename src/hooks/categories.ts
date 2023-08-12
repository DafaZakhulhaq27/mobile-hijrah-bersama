import { useEffect, useState } from "react";
import { getCategories } from "../api/categories";
import { Category } from "../api/categories/model";

export default function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const getCategory = async () => {
    setLoading(true);
    try {
      const res = await getCategories({
        limit: "9999",
        page: "1",
        search: search,
      });
      setCategories(res.data);
    } catch (err) {
      console.log(err, "err");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategory();
  }, [search]);

  return {
    categories,
    loading,
    setSearch,
  };
}
