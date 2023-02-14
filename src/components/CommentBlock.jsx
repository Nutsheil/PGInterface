import React, {useContext} from 'react';
import TextareaAutosize from "react-textarea-autosize";
import classes from "./CommentBlock.module.css";
import {contextSelectedRows} from "../context";
import classnames from "classnames";

const CommentBlock = () => {
    const [selectedRows, setSelectedRows] = useContext(contextSelectedRows)

    const getComment = () => {
        if (selectedRows.length === 0) {
            return ""
        }
        if (selectedRows.length === 1) {
            return "комментарий к стопу с id: " + selectedRows[0]
        }
        return "Выбрано несколько строк"
    }

    return (
        <div className={classes.container}>
            <h3>Комментарий</h3>
            <TextareaAutosize
                className={selectedRows.length > 1 ? classnames(classes.textarea, classes.error) : classes.textarea}
                minRows={6}
                maxRows={6}
                defaultValue={getComment()}
                disabled={true}
            />
        </div>
    );
};

export default CommentBlock;