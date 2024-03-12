import { Button, Divider, Modal, NoRecordsFound } from "@Components";
import { translate } from "@I18n";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { PageDndModalProps } from "./interface";

function PageDndModal({
    isOpen = false,
    size = 'lg',
    title,
    dndData,
    onSubmitClick,
    isDndModalOpen = false,
    isLoading = false

}: PageDndModalProps) {
    const [dragAndReorderData, setDragAndReorderData] = useState<any>([])
    const [dndIdSequenceObj, setDndIdSequenceObj] = useState([])
    const [isOpenModal, setIsOpenModal] = useState(isOpen)

    function handleOnDragEnd(result: any) {
        if (!result.destination) return;

        const items = Array.from(dragAndReorderData);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        let newItemId = []
        let newitems = items.filter((item: any) => {

            if (item?.section_type === 'TS') {
                newItemId.push({ id: item.id, title_section: item?.title_section } as never)
                return newItemId
            }
            else if (item?.section_type === 'IS') {
                newItemId.push({ id: item.id, image_section: item?.image_section } as never)
                return newItemId
            }
            else if (item?.section_type === 'VS') {
                newItemId.push({ id: item.id, video_section: item?.video_section } as never)
                return newItemId
            }
            else if (item?.section_type === 'PS') {
                newItemId.push({ id: item.id, paragraph_section: item?.paragraph_section } as never)
                return newItemId
            }
            else if (item?.section_type === 'LS') {
                newItemId.push({ id: item.id, list_section: item?.list_section } as never)
                return newItemId
            }
        })
        const newArrayElement = newItemId.map((item: any, index) => {
            return { ...item, order_sequence: index + 1 }
        });

        let newArray = items.map((item: any, index) => {
            return { ...item, order_sequence: index + 1 }
        });
        setDragAndReorderData(newArray);
        setDndIdSequenceObj(newArrayElement as never)
    }
    return (
        <>
            <span className=" ni ni-active-40 mt-1 mr-2 text-light ni-lg" onClick={() => {
                setIsOpenModal(!isOpenModal)
                setDragAndReorderData(dndData)
            }}  ></span>
            <Modal
                isOpen={isOpenModal}
                size={size}
                onClose={() => setIsOpenModal(!isOpenModal)}
                title={title}>
                {dragAndReorderData && dragAndReorderData?.length > 0 ?
                    <div className="overflow-auto scroll-hidden pb--3" style={{ height: '55vh' }}>
                        <DragDropContext onDragEnd={handleOnDragEnd} >
                            <Droppable droppableId="id">
                                {(provided: any) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef}>
                                        {dragAndReorderData.map((item, index) => {
                                            console.log("itemmm==>",item)
                                            return (
                                                <div>
                                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                                        {(provided: any) => (
                                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                <div>
                                                                    <p>
                                                                        {/* {item?.title_section?.reference_name ||
                                                                            item?.image_section?.reference_name ||
                                                                            item?.paragraph_section?.reference_name ||
                                                                            item?.list_section?.reference_name ||
                                                                            item?.video_section?.reference_name
                                                                        } */}
                                                                        {item?.reference_name}
                                                                    </p>
                                                                    {dragAndReorderData.length > 0 && <Divider />}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                </div>
                                            );
                                        })}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                    : <NoRecordsFound />}
                <div className="text-right mt-3">
                    <Button 
                    isLoading={isLoading}
                    text={translate("common.submit")!} 
                    onClick={() => {
                        if (onSubmitClick) {
                            onSubmitClick(dndIdSequenceObj)
                            if (!isDndModalOpen) { setIsOpenModal(!isOpenModal) }
                        }
                    }} />
                </div>
            </Modal>
        </>
    )

}

export { PageDndModal };

