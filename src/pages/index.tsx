import { HomeContainer, Product } from "../styles/pages/home";

import { GetServerSideProps } from "next";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import Image from "next/image";
import { stripe } from "../lib/stripe";

import Stripe from "stripe";
import camiseta1 from "../assets/camisas/1.png";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
  }[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map((p) => {
        return (
          <Product className="keen-slider__slide" key={p.id}>
            <Image src={p.imageUrl} width={520} height={480} alt="" />
            <footer>
              <strong>{p.name}</strong>
              <span>{p.price}</span>
            </footer>
          </Product>
        );
      })}
    </HomeContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((p) => {
    const price = p.default_price as Stripe.Price;

    return {
      id: p.id,
      name: p.name,
      imageUrl: p.images[0],
      price: price.unit_amount,
    };
  });

  return {
    props: {
      products,
    },
  };
};
