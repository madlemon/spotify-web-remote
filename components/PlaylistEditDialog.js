import React from "react";
import useDialog from "../hooks/useDialog";
import {PencilIcon} from "@heroicons/react/outline";

function PlaylistEditDialog() {
    let content = <>
        <p>hm</p>
    </>;

    const {open, dialog} = useDialog("Edit Playlist", [content])

    return (
        <div>
            <PencilIcon className="w-5 opacity-10 hover:opacity-100 cursor-pointer"
                        data-testid='playlist-edit-icon'
                        onClick={event => {
                            event.stopPropagation()
                            open()
                        }}/>
            {dialog}
        </div>
    )
}

export default PlaylistEditDialog
