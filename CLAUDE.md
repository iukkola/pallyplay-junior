# CLAUDE.md - PallyPlayJunior Project

## Project Overview
UEFA-branded youth football prediction app with educational "Respect" component. Built with React Native/Expo.

## Current Status
- **Production PWA**: `http://91.99.198.176:8080/pwa/` ✅ TOIMII
- **Local Development**: `/Users/ilkkaukkola/PallyPlayJunior/`
- **Server**: `91.99.198.176` (Hetzner)
- **API**: Sportsmonks Live Score API
- **Stage**: Development/Testing

## Server Setup
### Location
- **IP**: 91.99.198.176
- **Provider**: Hetzner
- **Access**: SSH with password `pallyplay`

### Port Usage
- **8080**: PWA Production (PID 85197) ✅ TOIMII
- **8081**: Reserved for Expo development server
- **3000, 3001**: Currently occupied by Python processes
- **4000**: Available for alternative Expo port

### Server Project Location
✅ **CONFIRMED**: `/root/PallyPlayJunior/pwa/` 
- **URL**: `http://91.99.198.176:8080/pwa/`
- **Files**: `index.html`, `js/friends.js`, `js/statistics.js`, `js/predictions.js`
- **Features**: Login, XP system, Benfica branding

## Project Structure
```
PallyPlayJunior/
├── App.tsx                 # Main app with tab navigation
├── SportsmonksService.tsx  # Live match data integration
├── StatsScreen.tsx         # Trophy Cabinet & statistics
├── TestingScreen.tsx       # Simple testing tools
├── TestDataGenerator.tsx   # Automated test data creation
├── RespectQuestions.tsx    # UEFA Respect educational component
├── CLAUDE.md              # This documentation file
├── package.json           # Dependencies
└── ...
```

## Key Features
### 1. UEFA Respect Integration
- **Concept**: Emotion → Excitement → Respect
- **Implementation**: Post-match educational questions
- **Questions**: Random, with follow-up logic
- **Goal**: Make UEFA Respect values actionable

### 2. Live Match Data
- **API**: Sportsmonks Live Score API
- **Test Match**: Estoril vs Benfica (ID: 19160788)
- **Includes**: Participants, scores, events, league data

### 3. Test Data System
- **30 Users**: Finnish names, avatars, star balances
- **Group Structure**: 
  - 1x UEFA PP Club (all users)
  - 3x 2-person groups
  - 4x 3-person groups  
  - 3x 4-person groups
- **Betting**: Individual and group betting simulation

## Development Protocols
### Local Development
1. **Working Directory**: `/Users/ilkkaukkola/PallyPlayJunior/`
2. **Start Command**: `npm start`
3. **Port**: 8081 (default)
4. **Access**: `http://localhost:8081`

### Server Deployment
1. **Ensure port 8081 is free**: `kill -9 <PID>` if needed
2. **Navigate to project**: `cd /path/to/PallyPlayJunior`
3. **Start Expo**: `npm start` or `npx expo start --port 4000`
4. **Access**: `http://91.99.198.176:8081` or alternative port

## API Configuration
### Sportsmonks API
- **File**: `SportsmonksService.tsx`
- **Token Location**: Line 26 - `setApiToken('YOUR_API_TOKEN_HERE')`
- **⚠️ REQUIRED**: Replace with actual API token
- **Test Endpoint**: `/v3/football/livescores/inplay`

## Testing Workflow
1. **Generate Test Data**: Go to "Testidata" tab → "Luo testidata"
2. **Place Bets**: Click "Aseta veto kaikille" for mass testing
3. **Monitor Live**: "Live" tab for real match data
4. **Respect Questions**: Triggered after match completion

## Navigation Structure
- **Koti** 🏠: Main betting interface
- **Live** ⚽: Sportsmonks live match data
- **Tilastot** 🏆: Trophy Cabinet & statistics
- **Testaus** 🧪: Simple testing tools
- **Testidata** 👥: Mass test data generation

## Common Issues & Solutions
### Port 8081 Occupied
```bash
# Check what's using the port
netstat -tlnp | grep 8081

# Kill the process
kill -9 <PID>

# Or use alternative port
npx expo start --port 4000
```

### Project Not Found on Server
⚠️ **MASTER PLAN VIOLATION**: This should not happen. When resolved:
1. Document exact server project location
2. Update this file with correct path
3. Ensure all team members know the location

### API Token Missing
- Edit `SportsmonksService.tsx` line 26
- Replace `'YOUR_API_TOKEN_HERE'` with actual token
- Test with "Testiottelut" button

## Future Development
### Planned Features
1. **Real-time Respect Questions**: Integrate with match completion
2. **Advanced Analytics**: User behavior tracking
3. **Multi-language Support**: Localized questions per country
4. **UEFA Partnership**: Official branding and endorsement

### Technical Debt
- [ ] Standardize error handling across components
- [ ] Add loading states for all API calls
- [ ] Implement proper state management (Redux/Context)
- [ ] Add unit tests for Respect question logic

## Important Notes
- **NEVER** commit API tokens to version control
- **ALWAYS** check server project location before deployment
- **MASTER PLAN**: This file prevents project location chaos
- **UEFA Focus**: Educational component is the differentiator

## Last Updated
2025-01-11 - Initial CLAUDE.md creation to prevent Master Plan violations

---
*This file is critical for project continuity. Update it whenever making structural changes.*