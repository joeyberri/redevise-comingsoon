import Section from "../components/Section.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { products } from "../constants/index.jsx";

const Products = () => {
  return (
    <Section name="products" showDivider>
      <SectionHeader
        pill="The Product Ecosystem"
        title={(
          <>
            Tools built to eliminate friction -{" "}
            <span className="text-gradient">not add to it.</span>
          </>
        )}
        subtitle="Each Redevise product is purpose-built around a single mission: dramatic, measurable improvement in how a specific workflow operates."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, i) => (
          <ProductCard key={product.id} {...product} index={i} />
        ))}
      </div>
    </Section>
  );
};

export default Products;
