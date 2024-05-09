import { Text } from "@react-email/components";
import React from "react"

const MyTemplate = ({ name }: { name: string }) => {
    return (
        <html lang="ru">
            <h1>My Template</h1>
            <Text>
                Привет  {name}
                <button
                >

                </button>
            </Text>
        </html>
    )
}

export default MyTemplate;
