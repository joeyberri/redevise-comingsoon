import Section from "../components/Section.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { useLanguage } from "../utils/LanguageContext.jsx";

const Products = () => {
  const { t } = useLanguage();

  const productsList = t('products.list') || [];

  // Zigzag pattern: alternating 2+1 and 1+2 rows, with the final card taking full width (3 cols)
  const getSpanClass = (i, total) => {
    if (i === total - 1) return "lg:col-span-3";
    if (i % 4 === 0 || i % 4 === 3) return "lg:col-span-2";
    return "";
  };

  return (
    <Section name="products">
      <SectionHeader
        pill={t('products.pill')}
        title={t('products.title')}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {productsList.map((product, i) => (
          <ProductCard 
            key={product.id} 
            {...product} 
            index={i} 
            className={getSpanClass(i, productsList.length)}
          />
        ))}
      </div>
    </Section>
  );
};

export default Products;
