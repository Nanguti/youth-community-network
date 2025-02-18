import { Category } from "@/types/Thread";

interface CategorySidebarProps {
  categories: Category[];
  selectedCategory: number; // Changed from string to number to match Category.id
  onCategorySelect: (categoryId: number) => void; // Changed to accept number
}

const CategorySidebar = ({
  categories,
  selectedCategory,
  onCategorySelect,
}: CategorySidebarProps) => {
  return (
    <div className="col-span-12 lg:col-span-3">
      <div className="sticky top-8 space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <div className="space-y-1">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => category.id && onCategorySelect(category.id)}
                  className={`w-full flex items-center px-4 py-2 text-sm rounded-lg
                    transition-colors ${
                      selectedCategory === category.id
                        ? "bg-indigo-50 text-pink-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  <Icon className="h-4 w-4 mr-3" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;
