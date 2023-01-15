import styled from 'styled-components';
import {API} from "../../service/swagger/swagger.interface";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Link from "next/link";
import classNames from "classnames";
import {GroupSection} from "../GroupSection/GroupSection";

const StyledContainer = styled.div`
  color: #7e8895;
  word-break: break-all;

  .header-body {
    color: #7e8895;
    display: flex;
    border-bottom: 1px solid #eaebef;
    padding: 10px 0px;
    font-weight: 600;

    .header-atribute {
      flex: 3;
    }

    .header-description {
      flex: 4;
    }
  }

  .item-container {
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
        border: 1px solid rgba(51, 51, 51, 0.1);
      }

      .item-type {
        background: #222;
        color: white;
        font-size: 11px;
        font-weight: 500;
        text-transform: uppercase;
        display: inline-block;
        padding: 2px 5px;

        //&.string {
        //  background: #279dff;
        //}
        //
        //&.integer,
        //&.number {
        //  background: #7cc9a3;
        //}
        //
        //&.boolean {
        //  background: #ff8c27;
        //}
        //
        //&.object {
        //  background: #7c7cc9;
        //}
        //
        //&.array {
        //  background: #ff62cc;
        //}
      }

      &:before {
        content: '';
        height: 100%;
        width: 1px;
        background: rgb(164 164 198);
        left: 0px;
        top: 17px;
        z-index: 1;
        position: absolute;
      }

      &:after {
        content: '';
        height: 17px;
        width: 1px;
        background: rgb(164 164 198);
        left: 0px;
        top: 0px;
        z-index: 1;
        position: absolute;
      }

      .item-key {
        flex: 3;

        .item-text {
          position: relative;
          padding-left: 14px;
          line-height: 16px;

          &:before {
            content: '';
            height: 1px;
            width: 10px;
            background: rgb(164 164 198);
            left: 0px;
            top: 50%;
            z-index: 1;
            position: absolute;
          }
        }
      }

      &.first {
        &:after {
          content: none;
        }
      }

      &.last {
        &:before {
          content: none;
        }
      }

      .item-value {
        flex: 4;
        padding-bottom: 8px;
        border-bottom: 1px solid #eaebef;
      }
    }

    .children {
      margin: 10px 0px;
      padding: 10px 15px;
      margin-left: 15px;
      background: rgb(250, 250, 250);

      &.alternative {
        background: white;
      }
    }
  }

  .body-section {
    //background: #f3f3f3;
    border: 1px solid #e6e8e8;
    margin-bottom: 20px;
  }

  .body-content {
    padding: 10px 15px;
  }

  .request-title {
    padding: 10px;
    background: #f3f3f3;
    border-bottom: 1px solid #e6e8e8;
    color: #000;
    font-weight: 600;
  }
`;

interface IProps {
    api: API
    body: any
}
export function BodyViewer(props: IProps) {

    return (
        <StyledContainer>
            {props.body[0].schemas.length == 1 && <div className={'body-section'}>
                    <div className="body-content">
                        <div className="header-body">
                            <div className="header-atribute">Atributo</div>
                            <div className="header-description">Descrição</div>
                        </div>
                        <ViewObject
                            content={props.body[0].schemas[0].properties}
                        />
                    </div>
                </div>}
            {props.body[0].schemas.length > 1 &&
                props.body[0].schemas.map((schema, i) => <div className={'body-section'}>

                    <div className="request-title">
                        {schema.description ?? 'Body request ' + i}
                    </div>

                    <div className="body-content">
                    <div className="header-body">
                        <div className="header-atribute">Atributo</div>
                        <div className="header-description">Descrição</div>
                    </div>
                    <ViewObject
                        content={schema.properties}
                    />
                    </div>
                </div>)
            }


        </StyledContainer>
    );
}

function ViewObject({ content, alternative }: any): any {
    return Object.entries(content).map(([key, value]: any, index) => {
        const first = index === 0;
        const last = index === Object.entries(content).length - 1;

        if (value.type === 'object') {
            return (
                <div className={classNames('item-container')}>
                    <ItemKey name={key} value={value} first={first} last={last} />
                    <div className={classNames('children', alternative && 'alternative')}>
                        <ViewObject content={value.properties} alternative={!alternative} />
                    </div>
                </div>
            );
        } else if (value.type === 'array') {
            return (
                <div className={classNames('item-container')}>
                    <ItemKey name={key + '[]'} value={value} first={first} last={last} />
                    <div className={classNames('children', alternative && 'alternative')}>
                        <ViewArray content={value.items} alternative={!alternative} />
                    </div>
                </div>
            );
        } else {
            return (
                <div className={'item-container'}>
                    <ItemKey name={key} value={value} first={first} last={last} />
                </div>
            );
        }
    });
}

function ViewArray({ content, alternative }: any): any {
    switch (content.type) {
        case 'object':
            return (
                <>
                    <div>Array[</div>
                    <ViewObject content={content.properties} alternative={!alternative} />
                    <div>]</div>
                </>
            );
    }

    return null;
}

function ItemKey({ name, value, first, last }: any): any {
    let type = value.type;

    if (value.type === 'array') {
        switch (value.items.type) {
            case 'object':
                type = 'array [object]';
                break;
            case 'string':
                type = 'array [string]';
                break;
            case 'integer':
                type = 'array [number]';
                break;
            case 'number':
                type = 'array [number]';
                break;
            case 'boolean':
                type = 'array [boolean]';
                break;
        }
    }
    return (
        <div className={classNames('item-body', first && 'first', last && 'last')}>
            <div className={'item-key'}>
                <div className="item-text">
                    {name}{' '}
                    {value.required && (
                        <span className={classNames('required-text')}>*</span>
                    )}
                </div>
            </div>
            <div className={'item-value'}>
                <div>
                    <div className={classNames('item-type', value.type?.toLowerCase())}>
                        {type}
                    </div>
                    {value.required && (
                        <div className={classNames('required')}>OBRIGATÓRIO</div>
                    )}
                </div>
                <div className="item-description">
                    <div>{value.description ?? ''}</div>
                    {!!value.example && <>Exemplo: <span className="example">{value.example ?? ''}</span></>}
                </div>
            </div>
        </div>
    );
}