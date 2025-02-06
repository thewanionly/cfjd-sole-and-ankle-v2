import React from 'react';
import styled from 'styled-components';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const VARIANTS = {
  DEFAULT: 'default',
  ON_SALE: 'on-sale',
  NEW_RELEASE: 'new-release'
};

const ShoeCard = ({ slug, name, imageSrc, price, salePrice, releaseDate, numOfColors }) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? VARIANTS.ON_SALE
    : isNewShoe(releaseDate)
      ? VARIANTS.NEW_RELEASE
      : VARIANTS.DEFAULT

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt='' src={imageSrc} />
        </ImageWrapper>
        <Spacer size={14} />
        <Row>
          <Name>{name}</Name>
          <Price isOldPrice={variant === VARIANTS.ON_SALE}>{formatPrice(price)}</Price>
        </Row>
        <Spacer size={6} />
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === VARIANTS.ON_SALE && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
        </Row>
        {variant === VARIANTS.ON_SALE && <SaleFlag>Sale</SaleFlag>}
        {variant === VARIANTS.NEW_RELEASE && <ReleaseFlag>Just Released!</ReleaseFlag>}
      </Wrapper>
    </Link>
  );
};

const Flag = styled.div`
  height: 32px;
  padding: 0 9px;
  border-radius: 2px;

  font-size: ${14 / 16}rem;
  font-weight: 700;
  color: ${COLORS.white};

  display: flex;
  align-items: center;

  position: absolute;
  top: 12px;
  right: -4px;
`;

const SaleFlag = styled(Flag)`
  background-color: ${COLORS.primary};
`;

const ReleaseFlag = styled(Flag)`
  background-color: ${COLORS.secondary};
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;

  display: flex;
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  font-size: 1rem;

  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: ${({ isOldPrice }) => (isOldPrice ? COLORS.gray[700] : COLORS.gray[900])};
  text-decoration: ${({ isOldPrice }) => isOldPrice && 'line-through'};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
