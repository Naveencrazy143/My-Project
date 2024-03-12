import React from 'react'
import Table from '../Table';
import { Spinner } from "@Components";


interface CommonTableProps {
  noRecordText?: string;
  displayDataSet?: Array<{}>;
  tableDataSet?: Array<{}>;
  tableTitle?: string;
  additionalDataSet?: Array<{
    elt: number,
    elv: string,
    elh: string
  }>;
  comparisonDataSet?: Array<{ key: string, value: string, elt: number, elv: string, elh: string }>
  tableOnClick?: (event: any, index: number, item: object) => void;
  tableValueOnClick?: (event: any, index: number, item: object, elv?: string) => void;
  noHeader?: boolean;
  noOfPage?: number;
  currentPage?: number;
  isPagination?: boolean;
  previousClick?: () => void;
  nextClick?: () => void;
  paginationNumberClick?: (text: number) => void;
  buttonText?: string;
  buttonOnClock?: () => void;
  tableChildren?: React.ReactNode;
  custombutton?: string
  isLoading?: boolean;
  tableDisabled?:number;


}


interface CommonHeaderProps {
  children?: React.ReactNode;
}

interface ChildComponentProps {
  text: number;
}


interface GetPaginatorSetProps {
  currentPage?: number;
  totalPages?: number;
}




function CommonTable({ tableTitle, displayDataSet, tableDataSet, additionalDataSet, noRecordText = 'No Data Found', tableOnClick, tableValueOnClick, noHeader, noOfPage, currentPage, isPagination, previousClick, nextClick, paginationNumberClick, buttonText, buttonOnClock, comparisonDataSet, tableChildren, custombutton, isLoading, tableDisabled }: CommonTableProps) {

  const CommonHeader = ({ children }: CommonHeaderProps) => {
    return (
      <div className='col'>

        {buttonText && <div className="col text-right mt-4 mb-4">
          {/* <Primary size={'btn-sm'} text={buttonText} onClick={buttonOnClock} /> */}
        </div>}

        {!noHeader ?
          <div className=" ">
            <div className="card-header border-0 ">
              <div className="row align-items-center ">
                <div className="col" >
                  <h3 className="mb-0 " >{tableTitle}</h3>
                </div>
              </div>
            </div>

            {children}

          </div> : <div>{children}</div>
        }
      </div>
    );
  }

  const GetPaginatorSet = ({ currentPage, totalPages }: GetPaginatorSetProps) => {
    if (currentPage && totalPages) {

      const children = [];
      if (currentPage && noOfPage) {


        let current_page = currentPage;
        let total_pages = noOfPage;

        let page_range = 5
        let page_range_start = current_page - Math.floor(page_range / 2)
        let page_range_end = current_page + Math.floor(page_range / 2)

        if (page_range_start <= 0) {
          let adjust = Math.abs(page_range_start)
          page_range_start = page_range_start + adjust + 1
          page_range_end = page_range_end + adjust + 1

        }

        if (total_pages < page_range_end) {
          let adjust = page_range_end - total_pages
          page_range_end = total_pages
          page_range_start = page_range_start - adjust
          if (page_range_start <= 0)
            page_range_start = 1

        }

        const ChildComponent = ({ text }: ChildComponentProps) => {
          return (<li className={`${currentPage + "" === text + "" ? 'active' : ''} page-item `} onClick={() => { if (paginationNumberClick) paginationNumberClick(text) }} ><a className="page-link" >{text}</a></li>);
        }


        for (var i = page_range_start; i <= page_range_end; i++) {
          children.push(<ChildComponent text={i} /> as never)
        }


      }

      return (
        <div className="card-footer">
          <div className='col-1'>
            {/* <span></span>
            <InputNumber /> */}
          </div>

          <ul className="pagination col justify-content-end mb-0">
            <li className={`${currentPage === 1 ? 'disabled' : ''} page-item `} onClick={currentPage === 1 ? undefined : previousClick}>
              <a className="page-link">
                <i className="fas fa-angle-left"></i>
                <span className="sr-only">Previous</span>
              </a>
            </li>
            {children}
            <li className={`${currentPage >= totalPages ? 'disabled' : ''} page-item `} onClick={currentPage >= totalPages ? undefined : nextClick} >
              <a className="page-link">
                <i className="fas fa-angle-right"></i>
                <span className="sr-only">Next</span>
              </a>
            </li>
          </ul>

        </div >
      )
    } else {
      return <></>
    }

  }

  const renderTable = () => {

    if (displayDataSet && displayDataSet.length <= 0) {
      //   return (<CommonHeader><div className='p-5'><NoRecordFound text={noRecordText} /></div></CommonHeader>);
    }

    return (
      <CommonHeader>
        {tableChildren ? <>{tableChildren}</> : <Table displayDataSet={displayDataSet} tableDataSet={tableDataSet} additionalDataSet={additionalDataSet} tableOnClick={tableOnClick} tableValueOnClick={tableValueOnClick} custombutton={custombutton} comparisonDataSet={comparisonDataSet} tableDisabled={tableDisabled}/>}
        {isPagination && <GetPaginatorSet currentPage={currentPage} totalPages={noOfPage} />}
      </CommonHeader>
    );


  }

  return (
    <div >
      {isLoading && <Spinner />}

      {!isLoading && (
        <div>
          {renderTable()}
        </div>
      )}

    </div>

  );
}

export { CommonTable }