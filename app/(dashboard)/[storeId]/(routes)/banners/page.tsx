import { BannerClient } from "./components/client";

const BannersPage = () => {
  return (
    <div className="flex flex-col space-y-4 p-8">
      {/* Header Section */}
      <div className="flex-1">
        <BannerClient />
      </div>
    </div>
  );
};

export default BannersPage;
