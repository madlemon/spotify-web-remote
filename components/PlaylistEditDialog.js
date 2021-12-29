import React from "react";
import useDialog from "../hooks/useDialog";
import {PencilIcon} from "@heroicons/react/outline";

function PlaylistEditDialog(props) {
    const [open, dialog] = useDialog("Edit Playlist", props.children)


    return (
        <div>
            <PencilIcon className="w-5 opacity-10 hover:opacity-100 cursor-pointer"
                        onClick={event => {
                            event.stopPropagation()
                            open()
                        }}/>
            {dialog}
        </div>
    )
}

export default PlaylistEditDialog
