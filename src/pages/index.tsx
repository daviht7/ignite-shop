import { HomeContainer, Product } from "../styles/pages/home";

import Image from "next/image";

import camiseta1 from "../assets/camisas/1.png";
import camiseta2 from "../assets/camisas/2.png";

export default function Home() {
  return (
    <HomeContainer>
      <Product>
        <Image src={camiseta1} width={520} height={480} alt="" />

        <footer>
          <strong>caamiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
      <Product>
        <Image src={camiseta2} width={520} height={480} alt="" />

        <footer>
          <strong>caamiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
    </HomeContainer>
  );
}
