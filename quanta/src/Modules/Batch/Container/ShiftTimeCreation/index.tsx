import { Card, Input, Button, Image } from '@Components'
import { icons } from "@Assets";
import { WEEK_DAY_LIST, gettingWeekDaysById } from '@Utils';
import { useSelector } from 'react-redux';
import { translate } from '@I18n'


interface props {
    datesList?: any;
    onCheckBoxClick?: (index: number) => void;
    onDeleteClick?: (el: any, breakdownItemIndex: number, itemIndex: number) => void;
    onAddClick?: (index: number) => void;
    onSubmit?: () => void;
    showButton?: boolean
}

const ShiftTimeCreation = ({ datesList, onCheckBoxClick, onAddClick, onDeleteClick, onSubmit, showButton = true }: props) => {



    const formatAMPM = (time: any) => {
        if (time) {
            let [hours, minutes, seconds] = time.split(':');
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12;
            let strTime = hours + ':' + minutes + ' ' + ampm;
            return strTime;
        } else {
            return ''
        }
    }

    const listingWeekDays = (it: any, index: number) => {
        return (
            <div className='row my-5'>
                <div className={'col-lg-2 mt-2'}>
                    <h4>{gettingWeekDaysById(WEEK_DAY_LIST, 'id', it.week_day + '').name}</h4>
                </div>
                <div className={'col-lg-2  mt-2'}> <label className="custom-toggle">
                    <input type="checkbox"
                        onChange={() => { if (onCheckBoxClick) { onCheckBoxClick(index) } }}
                        checked={it.is_working}
                        value={gettingWeekDaysById(WEEK_DAY_LIST, 'id', it.week_day + '').name}
                    />
                    <span
                        className="custom-toggle-slider rounded-circle"
                        data-label-off="No"
                        data-label-on="Yes">
                    </span>
                </label>
                </div>
                <div className={'col mt-2'}>
                    {it.is_working === true ?
                        <div>
                            <Button text={'+'} onClick={() => { if (onAddClick) { onAddClick(index) } }}
                            ></Button>
                        </div> : <div>
                            <h4>{'Not Working'}</h4>
                        </div>}
                </div >
                {it.is_working && <div className={'col-lg-6'}>
                    {it?.time_breakdown && it.time_breakdown.length > 0 && it.time_breakdown.map((el: any, breakdownItemIndex: number) => {

                        console.log("1qqqqqqqqqqqqqqqqq", el);

                        return (
                            <>
                                <div className='col-sm-5 col-sm-0 col-5 ml--3'>
                                    <Input
                                        heading={'Title'}
                                        placeholder={'Title'}
                                        disabled={true}
                                        value={el.title}
                                    />
                                </div>
                                <div className='row'>
                                    <div className={'col-sm-5 col-sm-0 col-5'}>
                                        <Input disabled={true} label={'IN'} value={formatAMPM(el.start_time)} />
                                    </div>
                                    <div className='col-sm-5 col-sm-0 col-5'>
                                        <Input disabled={true} label={'Out'} value={formatAMPM(el.end_time)} />
                                    </div>
                                    <div className={'col-xl-2 col-sm-0 col-2 ml-sm-0 mt-2'} style={{}}>
                                        <Image
                                            height={20}
                                            width={20}
                                            src={icons.delete}
                                            onClick={() => {
                                                if (onDeleteClick) { onDeleteClick(el, breakdownItemIndex, index) }
                                            }}
                                        />
                                    </div>
                                </div>
                            </>
                        )
                    })}

                </div>}
            </div>
        )
    }

    return (
        <>
            {datesList && (
                <div>
                    <div className='col-lg-12  px-3'>
                        {datesList && datesList.length > 0 && datesList?.map((it: any, index: number) => {
                            return listingWeekDays(it, index)
                        })}
                    </div>

                </div>

            )}
        </>
    )
}

export { ShiftTimeCreation }