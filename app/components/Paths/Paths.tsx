import styled from 'styled-components';
import {API, IParam} from "../../service/swagger/swagger.interface";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Link from "next/link";
import classNames from "classnames";

const StyledContainer = styled.div`
    position: relative;

    .item-body {
      display: flex;
      width: 100%;
      padding: 8px 0px;

      .required-text {
        color: #da001a;
      }

      .required {
        background: #da001a;
        color: white;
        font-size: 11px;
        font-weight: 500;
        text-transform: uppercase;
        display: inline-block;
        padding: 2px 5px;
        margin-left: 5px;
      }

      .example {
        vertical-align: middle;
        font-size: 13px;
        border-radius: 2px;
        background-color: rgba(51, 51, 51, 0.05);
        color: rgba(51, 51, 51, 0.6);
        padding: 0px 5px;
        word-break: break-all;
      }
      .item-type {
        background: #222;
        color: white;
        font-size: 11px;
        font-weight: 500;
        text-transform: uppercase;
        display: inline-block;
        padding: 2px 5px;
      }

      .item-key {
        flex: 3;

        .item-text {
          position: relative;
          padding-left: 14px;
          line-height: 16px;
        }
      }


      .item-value {
        flex: 4;
        padding-bottom: 8px;
      }
    }
  
`;

interface IProps {
    api: API,
    params: IParam[]
}
export function Paths(props: IProps) {

    return (
        <StyledContainer>
            <div className="header-body">
                <div className="header-atribute">Atributo</div>
                <div className="header-description">Descrição</div>
            </div>

            {props.params.map((param, index) => <div className={classNames('item-body')}>
                <div className={'item-key'}>
                    <div className="item-text">
                        {param.name}{' '}
                        {param.required && (
                            <span className={classNames('required-text')}>*</span>
                        )}
                    </div>
                </div>
                <div className={'item-param item-value'}>
                    <div>
                        <div className={classNames('item-type', param.type?.toLowerCase())}>
                            {param.type}
                        </div>
                        {param.required && (
                            <div className={classNames('required')}>OBRIGATÓRIO</div>
                        )}
                    </div>
                    <div className="item-description">
                        <div>{param.description ?? ''}</div>
                        {!!param.example && <>Exemplo: <span className="example">{param.example ?? ''}</span></>}
                    </div>
                </div>
            </div>)}
        </StyledContainer>
    );
}