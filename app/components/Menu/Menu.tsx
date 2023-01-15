import styled from 'styled-components';
import {API} from "../../service/swagger/swagger.interface";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Link from "next/link";
import classNames from "classnames";

const StyledContainer = styled.div`
  background: #f4f6fa;
  width: 100%;
  padding: 26px;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
min-height: 100%;

  .logo {
    padding-bottom: 24px;
  }

  .menu-section {
    padding-bottom: 20px;


    .menu-title {
      color: #7e8895;
      font-weight: 600;
      padding: 8px 0px;
      
    }

    .menu-item {
      color: #2a2f36;
      padding: 8px 0px;
      font-weight: 500;
    }

    .menu-sub-item {
      color: #878e99;
      padding: 8px 0px;
      padding-left: 20px;
      border-left: 3px solid #eaebef;
       a {
         width: 100%;
         display: inline-block;;
       }

      &.active {
        background: #eee;
        border-left: 3px solid #0d6efd;
        color: #0d6efd;
      }
    }

    .sub-menu-container {
      //max-height: 1000px;
      //overflow: hidden;
      //max-height: 0px;
    }
  }
`;

interface IProps {
    api: API
}
export function Menu(props: IProps) {

    const router = useRouter();
    const [path, setPath] = useState();

    useEffect(() => {
        function handleRouteChange(url) {
            setPath(url)
        }

        router.events.on('hashChangeComplete', handleRouteChange)
        return () => {
            router.events.off('hashChangeComplete', handleRouteChange)
        };
    }, []);

    return (
        <StyledContainer>
            <div className="logo">
                <img
                    src="https://cozy-assets.quintoandar.com.br/cozy-static/v2/latest/default/cobranded-logo/default/complete.pt-BR.svg"
                    alt=""
                />
            </div>

            <div className="menu-container">
                <div className={'menu-section'}>
                    <div className="menu-title">Bem vindo</div>
                    <div className="menu-item">
                        <Link href={"#introduction"}>Introdução</Link>
                    </div>
                    {/*<div className="menu-item">*/}
                    {/*    <a href="">Notas de atualização</a>*/}
                    {/*</div>*/}
                </div>

                <div className={'menu-section'}>
                    <div className="menu-title">Rotas</div>
                    {props.api.menu.map((menu) => (
                        <div>
                            <div className="menu-item">{menu.group == 'default' ? 'API' : menu.group}</div>
                            <div className="sub-menu-container">
                                {menu.items.map((item) => (
                                    <div className={classNames("menu-sub-item", path == "/#" + item.path && 'active')}>
                                        <Link href={"#" + item.path}>
                                            {item.name}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </StyledContainer>
    );
}