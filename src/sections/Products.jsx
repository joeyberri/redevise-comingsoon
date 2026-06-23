import Section from "../components/Section.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { useLanguage } from "../utils/LanguageContext.jsx";

const Products = () => {
  const { t } = useLanguage();

  // Zigzag pattern: index 0 = wide, 1 = narrow, 2 = narrow, 3 = wide, 4 = full
  const getSpanClass = (i) => {
    if (i === 0 || i === 3) return "lg:col-span-2";
    if (i === 4) return "lg:col-span-3";
    return "";
  };

  return (
    <Section name="products">
      <SectionHeader
        pill={t('products.pill')}
        title={t('products.title')}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {t('products.list').map((product, i) => (
          <ProductCard 
            key={product.id} 
            {...product} 
            index={i} 
            className={getSpanClass(i)}
          />
        ))}
      </div>
    </Section>
  );
};

export default Products;
