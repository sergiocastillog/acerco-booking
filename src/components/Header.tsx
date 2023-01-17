import { Box } from "components/layout/Box";
import { SkeletonBox } from "components/layout/SkeletonBox";
import { CompanyLogo } from "components/CompanyLogo";
import { Row } from "components/layout/Row";
import { Typography } from "components/Typography";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { useIsBrandedPageFlag } from "helpers/hooks/useIsBrandedPageFlag";
import { headerSelector } from "state/selectors/headerSelector";
import { useLocation } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;

  width: 100%;
  margin-bottom: calc(4.5 * ${({ theme }) => theme.spacing});

  ${({ theme }) => theme.mediaBelow(theme.breakpoints.sm)} {
    padding: 0 20px;
  }

  & > .full-row-wrap {
    width: 100%; 
    gap: 20px;
    flex-wrap: wrap;
  }
`;

const HeaderLoader = () => {
  return (
    <Wrapper>
      <Row>
        <SkeletonBox w="40px" h="40px" />
        <Box ml={1.25}>
          <SkeletonBox w="200px" h="24px" />
        </Box>
      </Row>
    </Wrapper>
  );
};


const ErrorHeaderWrapper = styled.div`
  position: relative;
`;

const TimeRiseLogo = styled.img`
  width: 35%;
  height: auto;
  position: relative;
  top: -12px;
`;

const ErrorHeader = () => {
  return (
    <ErrorHeaderWrapper>
      <TimeRiseLogo
        src="https://tu-spot.cl/wp-content/uploads/2023/01/logo_new.png"
        alt="timerise logo"
        data-cy="time-rise-footer-logo"
      />
    </ErrorHeaderWrapper>
  );
};

const Header: React.FC = () => {
  const location = useLocation();
  const data = useRecoilValue(headerSelector);
  const isBrandedPage = useIsBrandedPageFlag();
  if (isBrandedPage && data === undefined) return <HeaderLoader />;

  if (location.pathname === "/") {
    return <ErrorHeader />;
  }

  return (
    <Wrapper>
      <Row className="full-row-wrap">
        <Row>
          <CompanyLogo src="https://tu-spot.cl/wp-content/uploads/2023/01/logo_new.png" alt="logo"/>
          <Box ml={1.25} >
            <Typography
              typographyType="h1"
              as="h1"
              displayType="contents"
              data-cy="company-name"              
            >              
            </Typography>
          </Box>
        </Row>
      </Row>
    </Wrapper>
  );
};

export default Header;
