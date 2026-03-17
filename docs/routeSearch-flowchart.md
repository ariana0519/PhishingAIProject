# Search and Address Bar Routing – Flowchart

## Flowchart (Mermaid)

```mermaid
flowchart TD
    Start([User enters query, presses Enter])
    Trim[Trim and lowercase query]
    RouteSearch[routeSearch query]
    
    Start --> Trim
    Trim --> RouteSearch
    
    RouteSearch --> CheckOutlook{Contains: outlook,<br/>microsoft, office,<br/>live.com, hotmail?}
    CheckOutlook -->|Yes| Outlook[page: search-outlook]
    CheckOutlook -->|No| CheckGmail{Contains: gmail,<br/>google mail?}
    
    CheckGmail -->|Yes| Gmail[page: search-gmail]
    CheckGmail -->|No| CheckDrive{Contains: drive,<br/>google drive?}
    
    CheckDrive -->|Yes| Drive[page: search-drive]
    CheckDrive -->|No| CheckMaps{Contains: maps,<br/>google maps?}
    
    CheckMaps -->|Yes| Maps[page: search-maps]
    CheckMaps -->|No| CheckYoutube{Contains: youtube,<br/>video?}
    
    CheckYoutube -->|Yes| Youtube[page: search-youtube]
    CheckYoutube -->|No| CheckDocs{Contains: docs,<br/>google docs?}
    
    CheckDocs -->|Yes| Docs[page: search-docs]
    CheckDocs -->|No| Generic[page: search]
    
    Outlook --> ShowPage[showPage pageId]
    Gmail --> ShowPage
    Drive --> ShowPage
    Maps --> ShowPage
    Youtube --> ShowPage
    Docs --> ShowPage
    Generic --> ShowPage
    
    ShowPage --> End([Display page])
```

## Simplified View (Query → Page Mapping)

```mermaid
flowchart LR
    subgraph routeSearch
        Q[Query] --> O[outlook, microsoft, office, live.com, hotmail]
        Q --> G[gmail, google mail]
        Q --> D[drive, google drive]
        Q --> M[maps, google maps]
        Q --> Y[youtube, video]
        Q --> Doc[docs, google docs]
        Q --> E[else]
    end
    
    subgraph showPage
        O --> P1[search-outlook]
        G --> P2[search-gmail]
        D --> P3[search-drive]
        M --> P4[search-maps]
        Y --> P5[search-youtube]
        Doc --> P6[search-docs]
        E --> P7[search]
    end
```

## Address Bar Special Cases

The address bar has additional logic before `routeSearch`:

- **dashboard**, **session**, **session data** → `goToDashboard()` (skip routing)
- **outlook**, **microsoft**, **office**, **live**, **hotmail** → `showPage("outlook-login")` (direct login)
- **mail**, **gmail** → `showPage("gmail-login")`
- **drive** → `showPage("drive-login")`
- **maps** → `showPage("maps-login")`
- **youtube**, **video** → `showPage("youtube-login")`
- **docs** → `showPage("docs-login")`
- **else** → `showPage(routeSearch(query))` (use flowchart above)

---

**How to view:** Paste the Mermaid code into [mermaid.live](https://mermaid.live) to render and export as PNG/SVG for your dissertation.
