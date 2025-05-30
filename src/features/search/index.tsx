import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { debounce } from "lodash";
import { useSearchParams } from "react-router-dom";

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = debounce((query: string) => {
    if (query.length) {
      searchParams.set("search", query);
    } else {
      searchParams.delete("search");
    }
    setSearchParams(searchParams);
  }, 300);

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Input.Search
        placeholder="Search..."
        allowClear
        enterButton={<SearchOutlined />}
        size="large"
        defaultValue={searchParams.get("search") || ""}
        className="sm:max-w-md"
        onSearch={handleSearch}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};
