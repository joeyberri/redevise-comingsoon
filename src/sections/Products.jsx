import Section from "../components/Section.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { products } from "../constants/index.jsx";
import Grid from "../components/Grid.jsx";

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

      <Grid cols={3} gap={6}>
        {products.map((product, i) => (
          <ProductCard key={product.id} {...product} index={i} />
        ))}
      </Grid>
    </Section>
  );
};

export default Products;
