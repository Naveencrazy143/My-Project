import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button, Input, InputHeading } from '@Components'
import { AddMarkDownPageTaskProps } from './interface'
import { Form } from 'reactstrap'
import { useState } from 'react';

const AddMarkDownPageTask = ({ titleValue, onChangeTitle, onChangeQuill, quillValue, descriptionValue, onChangeDescription, onClick, isLoading }: AddMarkDownPageTaskProps) => {

    return (
        <>
            <div>
                <div className='col'>
                    <Input
                        id={'title'}
                        heading={'Title'}
                        placeholder={'Title'}
                        type={'text'}
                        value={titleValue}
                        onChange={(val) => {
                            if (onChangeTitle) {
                                onChangeTitle(val)
                            }
                        }}
                    />
                    <div className="form-group">
                        <InputHeading heading={'Description'} />
                        <textarea className="form-control" id="description" value={descriptionValue}
                            placeholder={'Write Description'}
                            onChange={(val) => {
                                if (onChangeDescription) {
                                    onChangeDescription(val)
                                }
                            }} />
                    </div>

                    <div className="form-group">
                        <InputHeading heading={'Mark down'} />
                        <Form>
                            <div
                                data-quill-placeholder="Quill WYSIWYG"
                                data-toggle="quill"
                            />
                            <ReactQuill
                                // value={quillValue}
                                onChange={(value) => {
                                    if (onChangeQuill) {
                                        onChangeQuill(value)
                                    }
                                }}
                                theme="snow"
                                modules={{
                                    toolbar: [
                                        ["bold", "italic"],
                                        ["link", "blockquote", "code", "image"],
                                        [
                                            {
                                                list: "ordered",
                                            },
                                            {
                                                list: "bullet",
                                            },
                                        ],
                                    ],
                                }}
                            />
                        </Form>
                    </div>

                    <div className='text-right pt-5'>
                        <Button
                            isLoading={isLoading}
                            text={'Submit'}
                            size={'md'}
                            onClick={onClick}
                        />
                    </div>
                </div>
            </div>

        </>
    )
}

export { AddMarkDownPageTask }
