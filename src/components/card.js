'use client'
import { useRouter } from 'next/navigation'
import styles from '../app/page.module.css'
import Link from 'next/link'

export default function Card({ href, title, text }) {
    const router = useRouter()
    const handleClick = (e) => {
        e.preventDefault()
        router.push(href)
    }

    return (
        <Link href={href} onClick={handleClick} className={styles.card} rel="noopener noreferrer">
            <h2>
                {title} 
                <span>-&gt;</span>
            </h2>
            <p>{text}</p>
        </Link>
    )
}