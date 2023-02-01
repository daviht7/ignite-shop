import { HomeContainer, Product } from "../styles/pages/home";

import { GetStaticProps } from "next";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import Image from "next/image";
import { stripe } from "../lib/stripe";

import Stripe from "stripe";

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

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((p) => {
    const price = p.default_price as Stripe.Price;

    return {
      id: p.id,
      name: p.name,
      imageUrl: p.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price.unit_amount / 100),
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, //2hours,
  };
};
