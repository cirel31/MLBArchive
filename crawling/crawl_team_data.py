import statsapi
import json

def get_team_info(team_id):
    try:
        team_info = statsapi.get("team", {"teamId": team_id})["teams"][0]
        return {
            "team_id": team_id,
            "team_name": team_info["name"],
            "created_year": team_info["firstYearOfPlay"],
            "team_logo": "",
            "team_location": team_info["locationName"]
        }
    except Exception as e:
        print(f"Failed to fetch team info for team_id {team_id}: {str(e)}")
        return None

def save_team_info(team_id, team_info):
    try:
        with open(f"./team_data/team_data_{team_id}.json", "w") as of:
            json.dump(team_info, of)
    except Exception as e:
        print(f"Failed to create JSON file for team_id {team_id}: {str(e)}")

def main():
    for year in range(1901, 2024):
        with open(f"./team_ids/team_ids{year}.json", "r") as f:
            teams = json.load(f)

        for team in teams:
            team_id = team["id"]
            team_info = get_team_info(team_id)

            if team_info:
                save_team_info(team_id, team_info)

if __name__ == "__main__":
    main()