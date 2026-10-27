import Section from "../components/Section.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { useLanguage } from "../utils/LanguageContext.jsx";

const Products = () => {
  const { t } = useLanguage();

  const productsList = t('products.list') || [];

  return (
    <Section name="products">
      <SectionHeader
        pill={t('products.pill')}
        title={t('products.title')}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {productsList.map((product, i) => (
          <ProductCard 
            key={product.id || i} 
            {...product} 
            index={i} 
          />
        ))}
      </div>
    </Section>
  );
};

export default Products;
